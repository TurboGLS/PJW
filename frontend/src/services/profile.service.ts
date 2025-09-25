import { authAxiosInstance } from "../lib/axios";

class ProfileService {
  async changePassword(oldPassword: String, newPassword: string) {
    const response = await authAxiosInstance.patch(
      "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/user/modifica-password",
      {
        oldPassword,
        newPassword,
      }
    );
    return response;
  }
}

const profileService = new ProfileService();
export default profileService;
