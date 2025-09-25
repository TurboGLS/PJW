import axios from "axios";

export const verifyEmail = async (token: string) => {
  return axios.get(
    `https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/verification/verify-email?token=${token}`
  );
};
