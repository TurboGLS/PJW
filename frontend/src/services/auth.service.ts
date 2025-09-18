import axios from "axios";
import JwtService from "./jwt.service";
import type { User } from "../entities/user.entity";

class UserService {
  private jwtService = new JwtService();

  constructor() {
    // refresh token logic, if /me fails, retries the call with the refresh one
    axios.interceptors.response.use(
      response => response,
      async error => {
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
              const res = await axios.post("/api/refresh", { refreshToken });
              this.jwtService.setToken(res.data.token);
              originalRequest.headers["Authorization"] = "Bearer " + res.data.token;
              return axios(originalRequest);
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
  }

  async login(username: string, password: string): Promise<User | Error> {
    try {
      const res = await axios.post('/api/login', { username, password });
      this.jwtService.setToken(res.data.token);
      this.jwtService.setRefreshToken(res.data.refreshToken);
      return res.data.user;
    } catch (e: any) {
      return e;
    }
  }

  async fetchUser(): Promise<User | null> {
    try {
      const token = this.jwtService.getToken();
      if (!token) return null;
      const res = await axios.get('api/user/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
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