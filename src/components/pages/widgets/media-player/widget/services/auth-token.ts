import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

import { getCookies } from '@utils/common';

// const EXP_TOKEN = 'U2FsdGVkX1+UduFrYQX3BKvPgReB7NG1QeiDbxeSR0diBJNv9f4XnE8ZIHCI1ZX/yxYnV7fmgk+bj8bFGFdQuYwXiitgNb/F8f1pFIEafrEW3QkWdXjG6/MZ+L3433AKqxPqiyaJwXGb3zkzp+2Xj2+aYceo+zSrTQGkZwCy4zi+xb9yqT1PmFsLmskMh7poxOk62MIxXk0QLIR/K+8oN4L0q7BahL+mFvbO/DLG6lw0ja1khkNXedFm7Wv72VVKyuL5wEQLPIFzXO6BOyDcQ/PV7x0xQ7zSJQJd3R7t/MrqPP/a2kTLQe9bse8ZNFXi32adFZx9OMF1crqi49fZPpUtW5RVMpSlaGM9LfXLJK8yVIOdIjeBR9epmRAxtixc';

export const getAccessToken = () => {
  const cookies = getCookies();
  const token = cookies['_MP_AT'];

  if (!token) {
    return null;
  }
  return AES.decrypt(token, process.env.SPOTIFY_AT).toString(Utf8);
};

export const getRefreshToken = () => {
  const cookies = getCookies();
  const token = cookies['_MP_RT'];

  if (!token) {
    return null;
  }

  return AES.decrypt(cookies['_MP_RT'], process.env.SPOTIFY_RT).toString(Utf8);
};

export const saveTokens = (access, refresh = null) => {
  const date = Date.now();
  const range = 1000*60*60*24*7; // 7 days
  const expires = new Date(date + range).toUTCString();

  if (access) {
    document.cookie = `_MP_AT=${AES.encrypt(access, process.env.SPOTIFY_AT).toString()};expires=${expires};path=/;Secure`;
  }
  if (refresh) {
    document.cookie = `_MP_RT=${AES.encrypt(refresh, process.env.SPOTIFY_RT).toString()};expires=${expires};path=/;Secure`;
  }
};

export const removeAccessToken = () => {
  const expires = new Date().toUTCString();
  document.cookie = `_MP_AT='';expires=${expires};path=/;Secure`;
  document.cookie = `_MP_AT='';expires=${expires};path=/;Secure`;
};