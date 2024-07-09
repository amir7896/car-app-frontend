import { LOGIN } from "../apiConstants";
import { api } from "../../utils";

class AuthApi {
  static sharedIstance = new AuthApi();

  constructor() {
    if (AuthApi.sharedIstance != null) {
      return AuthApi.sharedIstance;
    }
  }

  //   Login user
  async loginUser(body) {
    try {
      const response = await api.post(LOGIN, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default AuthApi.sharedIstance;
