import { SessionData, ResultData } from "../types";

export const generateId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// A robust way to encode any JS object to a URL-safe Base64 string that supports Unicode
export const encodeObjectToBase64 = (obj: any): string => {
    const jsonString = JSON.stringify(obj);
    // This TextEncoder approach correctly handles Unicode characters (like Marathi words or emojis) before btoa
    const utf8Bytes = new TextEncoder().encode(jsonString);
    let binaryString = '';
    utf8Bytes.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString);
};

// A robust way to decode a Base64 string (that was encoded with the above function) back to a JS object
export const decodeBase64ToObject = <T>(base64String: string): T => {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const jsonString = new TextDecoder().decode(bytes);
    return JSON.parse(jsonString) as T;
};

export const validateSessionData = (data: any): data is SessionData => {
    return data && data.creatorProfile && data.creatorAnswers && data.questionsUsed;
}

export const validateResultData = (data: any): data is ResultData => {
    return data && data.creatorProfile && data.partnerAnswers && data.questionsUsed;
}