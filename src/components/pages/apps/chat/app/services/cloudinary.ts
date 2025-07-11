import sha256 from 'crypto-js/sha256';

const REST_API = 'https://api.cloudinary.com/v1_1';
const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

type UploadResponse = {
  hasError?: boolean;
  errorMessage?: string;
  data?: string|null;
}

class Cloudinary {
  upload = async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      const timeStamp = Math.floor(Date.now()/1000); // unix

      formData.append('file', file);
      formData.append('api_key', API_KEY);
      formData.append('asset_folder', 'ChatAppPortfolio');
      formData.append('timestamp', timeStamp.toString());
      formData.append('signature', sha256(`asset_folder=ChatAppPortfolio&timestamp=${timeStamp}${API_SECRET}`).toString());

      const resp = await fetch(`${REST_API}/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      }).then((resp) => resp.json());

      return {
        hasError: Boolean(resp?.error),
        errorMessage: Boolean(resp?.error) ? 'Unable to upload file' : null,
        data: resp?.secure_url
      }
    } catch (e) {
      return {
        hasError: true,
        errorMessage: 'Unable to upload file',
      }
    }
  }
}

export default new Cloudinary();