import { SessionData, ResultData } from "../types.ts";

// Universal UTF-8 safe Base64 Encoder (No CompressionStream dependency)
// This ensures compatibility with all browsers and prevents "Failed to load" errors.
export const encodeObjectToBase64 = async (obj: any): Promise<string> => {
    try {
        const jsonString = JSON.stringify(obj);
        // Encode UTF-8 to Base64
        return btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }));
    } catch (e) {
        console.error("Encoding error", e);
        throw new Error("Failed to encode data");
    }
};

// Universal UTF-8 safe Base64 Decoder
export const decodeBase64ToObject = async <T>(base64String: string): Promise<T> => {
    try {
        // Handle URL-safe Base64 replacement if needed (though encodeURIComponent handles most)
        const safeString = base64String.replace(/-/g, '+').replace(/_/g, '/');
        
        // Handle standard Base64 decoding
        const binaryString = atob(safeString);
        
        // Decode Base64 to UTF-8
        const jsonString = decodeURIComponent(binaryString.split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonString) as T;
    } catch (e) {
        console.error("Decoding error", e);
        throw new Error("Failed to decode data");
    }
};

export const validateSessionData = (data: any): data is SessionData => {
    return data && data.creatorProfile && data.creatorAnswers && data.questionsUsed && data.analysisConfig && typeof data.quizTitle === 'string';
}

export const validateResultData = (data: any): data is ResultData => {
    return validateSessionData(data) && 'partnerProfile' in data && 'partnerAnswers' in data;
}