import http from "./http-common";

class UserDataService {
  register(data) {
    return http.post('/register', data);
  }

  signIn(data) {
    return http.post('/signIn', data);
  }

  signOut() {
    return http.post('/signOut');
  }

  forgotPassword(data) {
    return http.post('/forgot-password', data);
  }

  resetPassword(token, data) {
    return http.post(`/reset-password/${token}`, data);
  }
}

export default new UserDataService();