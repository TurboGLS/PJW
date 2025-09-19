import JwtService from "./jwt.service";
import type { User } from "../entities/user.entity";
import { authAxiosInstance, unauthAxiosInstance } from "../lib/axios";

class UserService {
  private jwtService = new JwtService();

  constructor() {
    // refresh token logic, if /me fails, retries the call with the refresh one
    authAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const refreshToken = this.jwtService.getRefreshToken();
          if (refreshToken) {
            try {
              const res = await unauthAxiosInstance.post("/api/refresh", {
                refreshToken,
              });
              this.jwtService.setToken(res.data.token);
              return authAxiosInstance(originalRequest);
            } catch (refreshError) {
              this.logout();
              window.location.href = "/login";
              return Promise.reject(refreshError);
            }
          } else {
            this.logout();
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    authAxiosInstance.interceptors.request.use((request) => {
      request.headers.setAuthorization("Bearer " + this.jwtService.getToken());
      return request;
    });
  }

  async register(
    firstName: String,
    lastName: String,
    email: String,
    password: String
  ) {
    const res = await unauthAxiosInstance.post("api/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return res;
  }

  async login(username: string, password: string): Promise<User | Error> {
    try {
      const res = await unauthAxiosInstance.post("/api/login", {
        username,
        password,
      });
      this.jwtService.setToken(res.data.token);
      this.jwtService.setRefreshToken(res.data.refreshToken);
      return res.data.user;
    } catch (e: any) {
      throw e;
    }
  }

  async fetchUser(): Promise<User | null> {
    try {
      const res = await authAxiosInstance.get("api/user/me");
      return res.data;
    } catch (e: any) {
      return null;
    }
  }

  logout() {
    this.jwtService.removeToken();
    this.jwtService.removeRefreshToken();
  }
}

const authService = new UserService();
export default authService;
