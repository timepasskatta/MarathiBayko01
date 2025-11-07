import { SessionData, ResultData } from "../types.ts";

// New, smarter encoder that compresses data and uses a URL-safe Base64 variant
export const encodeObjectToBase64 = async (obj: any): Promise<string> => {
    // Sanitize the object to remove any non-serializable parts before encoding
    const sanitizedObj = JSON.parse(JSON.stringify(obj));
    const jsonString = JSON.stringify(sanitizedObj);
    const stream = new Blob([jsonString], { type: 'application/json' })
        .stream()
        .pipeThrough(new CompressionStream('gzip'));
    
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    const compressedData = new Uint8Array(chunks.reduce((acc, val) => acc + val.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
        compressedData.set(chunk, offset);
        offset += chunk.length;
    }
    
    let binaryString = '';
    compressedData.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });

    // URL-safe Base64 encoding
    return btoa(binaryString)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

// New, smarter decoder that handles URL-safe Base64 and decompresses data
export const decodeBase64ToObject = async <T>(base64String: string): Promise<T> => {
    // Handle URL-safe Base64 and padding
    let safeString = base64String.replace(/-/g, '+').replace(/_/g, '/');
    while (safeString.length % 4) {
        safeString += '=';
    }
    
    const binaryString = atob(safeString.trim());
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const stream = new Blob([bytes])
        .stream()
        .pipeThrough(new DecompressionStream('gzip'));
    
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    const decompressedData = new Uint8Array(chunks.reduce((acc, val) => acc + val.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
        decompressedData.set(chunk, offset);
        offset += chunk.length;
    }

    const jsonString = new TextDecoder().decode(decompressedData);
    return JSON.parse(jsonString) as T;
};


export const validateSessionData = (data: any): data is SessionData => {
    return data && data.creatorProfile && data.creatorAnswers && data.questionsUsed && data.analysisConfig && typeof data.quizTitle === 'string';
}

export const validateResultData = (data: any): data is ResultData => {
    return validateSessionData(data) && 'partnerProfile' in data && 'partnerAnswers' in data;
}
