import axios from "axios";

export default class UserService {
  async login(username: String, password: String) {
    const res = await axios.post('/api/login', { username, password })
    return res
  }
}