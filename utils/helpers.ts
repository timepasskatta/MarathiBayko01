import { SessionData, ResultData } from "../types";

// Helper to read a stream into a Uint8Array, needed for Compression/Decompression Streams
const streamToUint8Array = async (stream: ReadableStream<Uint8Array>): Promise<Uint8Array> => {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let totalLength = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        totalLength += value.length;
    }
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
};

// New, smarter encoder that compresses data and uses URL-safe Base64
export const encodeObjectToBase64 = async (obj: any): Promise<string> => {
    // Sanitize the object to remove any non-serializable parts
    const sanitizedObj = JSON.parse(JSON.stringify(obj));
    const jsonString = JSON.stringify(sanitizedObj);

    const stream = new Blob([jsonString], { type: 'application/json' })
        .stream()
        .pipeThrough(new CompressionStream('gzip'));
    
    const compressedData = await streamToUint8Array(stream);
    
    let binaryString = '';
    compressedData.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });

    return btoa(binaryString)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

// New, smarter decoder that handles URL-safe Base64 and decompresses data
export const decodeBase64ToObject = async <T>(base64String: string): Promise<T> => {
    let sanitizedString = base64String.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (sanitizedString.length % 4) {
        sanitizedString += '=';
    }
    
    const binaryString = atob(sanitizedString);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const stream = new Blob([bytes])
        .stream()
        .pipeThrough(new DecompressionStream('gzip'));
    
    const decompressedData = await streamToUint8Array(stream);
    const jsonString = new TextDecoder().decode(decompressedData);
    return JSON.parse(jsonString) as T;
};

// FIX: Add missing 'generateId' function.
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const validateSessionData = (data: any): data is SessionData => {
    return data && data.creatorProfile && data.creatorAnswers && data.questionsUsed && data.analysisConfig && data.quizTitle;
}

export const validateResultData = (data: any): data is ResultData => {
    return validateSessionData(data) && 'partnerProfile' in data && 'partnerAnswers' in data;
}