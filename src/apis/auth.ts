import axios from "axios";
import { API_ROOT } from "~/utils/constants";

type user = {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  displayName: string;
};

interface loginResponseData {
  id: string,
  accessToken: string,
  email: string,
  isSuccess: boolean,
  role: string,
  username: string
}

const login = async (user: Omit<user, 'avatar' | 'email' | 'displayName'>): Promise<loginResponseData> => {
  const response = await axios.post(`${API_ROOT}/v1/auth/login`, user);
  return response.data
}

const register = async (user: user) => {
  const response = await axios.post(`${API_ROOT}/v1/auth/register`, user);
  return response.data;
}

export const auth = {
  login,
  register
}
