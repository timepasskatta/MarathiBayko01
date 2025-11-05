// A simple, URL-safe base64 encoding for objects.
// In a real app, you might add compression (e.g., with pako) for large objects.

// FIX: Added imports for SessionData and ResultData types for validation functions.
import { ResultData, SessionData } from '../types';

// Encodes an object to a URL-safe Base64 string
export const encodeObjectToBase64 = (obj: any): string => {
  try {
    const jsonString = JSON.stringify(obj);
    const base64String = btoa(jsonString);
    // Make it URL-safe
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error("Failed to encode object:", error);
    throw new Error("Could not encode data.");
  }
};

// Decodes a URL-safe Base64 string back to an object
export const decodeBase64ToObject = <T>(encodedString: string): T => {
  try {
    let base64 = encodedString.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with '=' signs
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonString = atob(base64);
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Failed to decode string:", error);
    throw new Error("Invalid or corrupt code provided.");
  }
};

// Generates a short, random, user-friendly code.
// e.g., "AB1-CD2"
export const generateFriendlyCode = (length = 6): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars like I, O, 0, 1
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Add a dash for readability if length is 6
  if (length === 6) {
    return `${result.slice(0, 3)}-${result.slice(3)}`;
  }
  return result;
};

// FIX: Added validation function for SessionData to ensure decoded objects match the expected structure.
export const validateSessionData = (data: any): data is SessionData => {
  return (
    data &&
    typeof data.creatorProfile === 'object' && data.creatorProfile !== null &&
    typeof data.creatorProfile.name === 'string' &&
    typeof data.creatorAnswers === 'object' && data.creatorAnswers !== null &&
    Array.isArray(data.questionsUsed) &&
    typeof data.analysisConfig === 'object' && data.analysisConfig !== null &&
    typeof data.quizTitle === 'string'
  );
};

// FIX: Added validation function for ResultData to ensure decoded objects match the expected structure.
export const validateResultData = (data: any): data is ResultData => {
  return (
    validateSessionData(data) &&
    typeof data.partnerProfile === 'object' && data.partnerProfile !== null &&
    typeof data.partnerProfile.name === 'string' &&
    typeof data.partnerAnswers === 'object' && data.partnerAnswers !== null
  );
};
