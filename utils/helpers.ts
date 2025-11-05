import { SessionData, ResultData } from "../types";

export const generateId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Helper to read a stream into a Uint8Array, needed for Compression/Decompression Streams
const streamToUint8Array = async (stream: ReadableStream<Uint8Array>): Promise<Uint8Array> => {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    const totalLength = chunks.reduce((acc, val) => acc + val.length, 0);
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
    const jsonString = JSON.stringify(obj);
    const stream = new Blob([jsonString], { type: 'application/json' })
        .stream()
        .pipeThrough(new CompressionStream('gzip'));
    
    const compressedData = await streamToUint8Array(stream);
    
    let binaryString = '';
    compressedData.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });

    const base64 = btoa(binaryString);
    // Make it URL-safe and remove padding for a cleaner look and better resilience
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''); 
};

// New, smarter decoder that handles URL-safe Base64 and potential corruption
export const decodeBase64ToObject = async <T>(base64String: string): Promise<T> => {
    // Sanitize input: remove whitespace
    let processedString = base64String.trim();
    // Restore URL-safe characters
    processedString = processedString.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding back. The length must be a multiple of 4 for atob.
    while (processedString.length % 4) {
        processedString += '=';
    }

    const binaryString = atob(processedString); // atob should be safer now.
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

export const validateSessionData = (data: any): data is SessionData => {
    // FIX: Added check for analysisConfig to ensure results page can display analysis text.
    return data && data.creatorProfile && data.creatorAnswers && data.questionsUsed && data.analysisConfig;
}

export const validateResultData = (data: any): data is ResultData => {
    // FIX: Added check for analysisConfig to ensure results page can display analysis text.
    return data && data.creatorProfile && data.partnerProfile && data.creatorAnswers && data.partnerAnswers && data.questionsUsed && data.analysisConfig;
}