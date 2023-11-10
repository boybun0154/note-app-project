import {
  RawAxiosRequestHeaders,
  AxiosHeaders,
  AxiosRequestConfig,
} from "axios";

const getJwtToken = () => {
  return sessionStorage.getItem("jwt");
};

const setJwtToken = (token: string): void => {
  sessionStorage.setItem("jwt", token);
};

const getHeader = (): AxiosRequestConfig => {
  return {
    headers: {
      "x-access-token": getJwtToken(),
    },
  };
};

export const auth = {
  getJwtToken,
  setJwtToken,
  getHeader
};
