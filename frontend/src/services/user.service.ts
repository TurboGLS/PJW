import axios from "axios";

export default class UserService {
  async login(username: String, password: String) {
    const res = await axios.post("/api/login", { username, password });
    return res;
  }

  async register(
    firstName: String,
    lastName: String,
    email: String,
    password: String
  ) {
    const res = await axios.post("api/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return res;
  }

  async user() {
    const res = await axios.get("api/user/me");
    return res;
  }
}
