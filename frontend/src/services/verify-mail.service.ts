import axios from "axios";

export const verifyEmail = async (token: string) => {
  return axios.get(`http://localhost:8080/api/verification/verify-email?token=${token}`);
};
