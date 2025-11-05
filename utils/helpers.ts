
// FIX: Changed import path to be relative.
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

// New, smarter encoder that compresses data to create much shorter codes
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

    return btoa(binaryString);
};

// New, smarter decoder that decompresses data
export const decodeBase64ToObject = async <T>(base64String: string): Promise<T> => {
    const binaryString = atob(base64String);
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
