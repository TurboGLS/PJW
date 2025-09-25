import JwtService from "./jwt.service";
import type { User } from "../entities/user.entity";
import { authAxiosInstance, unauthAxiosInstance } from "../lib/axios";

class AuthService {
  private jwtService = new JwtService();

  constructor() {
    const refreshInterceptor = async (error: any) => {
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
            const res = await unauthAxiosInstance.post(
              "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/refresh",
              {
                refreshToken,
              }
            );
            this.jwtService.setToken(res.data.token);
            originalRequest.headers["Authorization"] =
              "Bearer " + res.data.token;
            if (
              originalRequest.baseURL === authAxiosInstance.defaults.baseURL
            ) {
              return authAxiosInstance(originalRequest);
            } else {
              return unauthAxiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        } else {
          this.logout();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    };

    authAxiosInstance.interceptors.response.use(
      (response) => response,
      refreshInterceptor
    );

    authAxiosInstance.interceptors.request.use((request) => {
      request.headers["Authorization"] = "Bearer " + this.jwtService.getToken();
      return request;
    });
  }

  async register(
    firstName: String,
    lastName: String,
    email: String,
    password: String
  ) {
    const res = await unauthAxiosInstance.post(
      "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/register",
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
    return res;
  }

  async login(username: string, password: string): Promise<User | Error> {
    try {
      const res = await unauthAxiosInstance.post(
        "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/login",
        {
          username,
          password,
        }
      );
      this.jwtService.setToken(res.data.token);
      this.jwtService.setRefreshToken(res.data.refreshToken);
      return res.data.user;
    } catch (e: any) {
      throw e;
    }
  }

  async fetchUser(): Promise<User | null> {
    try {
      const res = await authAxiosInstance.get(
        "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/user/me"
      );
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

const authService = new AuthService();
export default authService;
