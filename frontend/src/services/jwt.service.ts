export default class JwtService {
  private authKey = 'authToken'
  private refreshKey = 'refreshToken'

  hasToken() {
    return !!this.getToken()
  }

  hasRefreshToken() {
    return !!this.getRefreshToken()
  }

  getToken() {
    return localStorage.getItem(this.authKey)
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshKey)
  }

  setToken(val: string) {
    localStorage.setItem(this.authKey, val)
  }

  setRefreshToken(val: string) {
    localStorage.setItem(this.refreshKey, val)
  }

  removeToken() {
    localStorage.removeItem(this.authKey)
  }

  removeRefreshToken() {
    localStorage.removeItem(this.refreshKey)
  }
}