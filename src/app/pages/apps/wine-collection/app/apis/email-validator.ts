const API_KEY = import.meta.env.VITE_HUNTER_API_KEY;
const REST_API = 'https://api.hunter.io/v2/email-verifier';

export const checkEmail = async (value: string): Promise<boolean> => {
  try {
    const data = await fetch(`${REST_API}?email=${value}&api_key=${API_KEY}`);

    const result = await data.json();
    return result.data.status !== 'invalid';
  } catch (e) {
    return false;
  }
};