import http from "./http-common";

class UserDataService {
  register(data) {
    return http.post('/register', data);
  }

  signIn(data) {
    return http.post('/signIn', data);
  }

  getUserData() {
    return http.get('/userData');
  }
}

export default new UserDataService();