import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { fetchRefreshToken } from '../api/auth';
import { getAccessToken, saveTokens } from '../services/auth-token';

const handleError = (error, message) => {
  if (error.config.showError) {
    // show message
  }

  return Promise.reject({
    ...error,
    message
  });
};

const onSuccess = (response) => {
  if (response.config.showError && (response.data.errors)) {
    // show message
  }
  return response;
}

const onError = async (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject({ ...error, canceled: true });
  }

  if (error.request.status === 401) {
    if (!error.config.useRefreshToken) {
      return handleError(error, 'User unauthorized');
    }
    const data: { error: any, access_token?: string, refresh_token?: string } = await fetchRefreshToken();

    if (data.access_token) {
      saveTokens(data.access_token, data.refresh_token);
      return instance({...error.config, _retry: true });
    }
    error.config.useRefreshToken = !data.error;

    return handleError(error, 'User unauthorized, refreshing token...');
  }

  if (error.code === 'ECONNABORTED') {
    return handleError(error, 'Timeout error');
  }

  if (error.message) {
    return handleError(error, error.message);
  }

  if (error.request.status === 0) {
    return handleError(error, 'No internet connection');
  }

  if (!error.response) {
    return handleError(error, 'Internal error');
  }

  return Promise.reject({ ...error });
}

interface IAxiosConfig extends CreateAxiosDefaults {
  showError: boolean,
  useRefreshToken: boolean,
}

const AxiosConfig: IAxiosConfig = {
  showError: false,
  useRefreshToken: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const instance: AxiosInstance = axios.create(AxiosConfig);

instance.interceptors.request.use((config: any) => {
  const token = getAccessToken();

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  };
});

instance.interceptors.response.use(onSuccess, onError);

export default instance;