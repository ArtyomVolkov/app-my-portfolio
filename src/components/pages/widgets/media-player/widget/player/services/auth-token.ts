import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

import { getCookies } from '@utils/common';

export const getAccessToken = () => {
  const cookies = getCookies();
  const token = cookies['_MPT'];

  if (!token) {
    return null;
  }
  return AES.decrypt(cookies['_MPT'], process.env.SPOTIFY_AUTH).toString(Utf8);
}

export const saveAccessToken = (token) => {
  document.cookie = `_MPT=${AES.encrypt(token, process.env.SPOTIFY_AUTH).toString()}`;
}