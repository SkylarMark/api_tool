import axios, { AxiosRequestConfig } from 'axios';

export const ApiHelper = {
  sendRequest: async (config: AxiosRequestConfig) => axios(config),
};
