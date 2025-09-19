import { authAxiosInstance } from "../lib/axios";

class ProfileService {
  async changePassword(oldPassword: String, newPassword: string) {
    const response = await authAxiosInstance.patch(
      "api/user/modifica-password",
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
