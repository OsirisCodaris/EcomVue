import axios from "../plugins/axios";

class AuthService {
  getToken(credential) {
    return axios.post("/authentification", credential);
  }
}

export default AuthService;
