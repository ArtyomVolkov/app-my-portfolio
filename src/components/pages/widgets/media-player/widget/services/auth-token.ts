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
  const date = Date.now();
  const range = 1000*60*60*24*7; // 7 days
  const expires = new Date(date + range).toUTCString();

  document.cookie = `_MPT=${AES.encrypt(token, process.env.SPOTIFY_AUTH).toString()};expires=${expires};path=/;Secure`;
}

export const removeAccessToken = () => {
  const expires = new Date().toUTCString();

  document.cookie = `_MPT='';expires=${expires};path=/;Secure`;
};