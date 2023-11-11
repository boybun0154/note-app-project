import {
  AxiosRequestConfig,
} from "axios";

const getJwtToken = () => {
  return sessionStorage.getItem("jwt");
};

const setJwtToken = (token: string): void => {
  sessionStorage.setItem("jwt", token);
};

const getCurrentUserId = (): string => {
  return sessionStorage.getItem("currentUserId");
}

const setCurrentUserId = (userId: string): void => {
  sessionStorage.setItem("currentUserId", userId);
}

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
  getHeader,
  setCurrentUserId,
  getCurrentUserId
};
