import http from "./http-common";

class UserDataService {
  register(data) {
    return http.post('/register', data);
  }
}

export default new UserDataService();