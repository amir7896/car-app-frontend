import {
  CREATE_USER_INFORMATION,
  DELETE_USER_INFORMATION,
  GET_USER_INFORMATION,
  REMOVE_BACKGROUND,
  UPDATE_USER_INFORMATION,
} from "../apiConstants";
import { api } from "../../utils";

class UserApi {
  static sharedIstance = new UserApi();

  constructor() {
    if (UserApi.sharedIstance != null) {
      return UserApi.sharedIstance;
    }
  }

  //   Create user information
  async createUserInformation(body) {
    try {
      const response = await api.post(CREATE_USER_INFORMATION, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  // Get user information
  async getUserInformation() {
    try {
      const response = await api.get(GET_USER_INFORMATION);
      const { data } = response.data;
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  // Get user information by id
  async getUserInformationById(id) {
    try {
      const response = await api.get(`${GET_USER_INFORMATION}/${id}`);
      const { success, data } = response.data;
      if (success) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  // Update user information
  async updateUserInformatin(id, body) {
    try {
      const response = api.put(`${UPDATE_USER_INFORMATION}/${id}`, body);
      return (await response).data;
    } catch (error) {
      return error.response.data;
    }
  }

  // Delete user information
  async deleteUserInformation(id) {
    try {
      const response = await api.delete(`${DELETE_USER_INFORMATION}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  // Remove background from user image
  async removeBackground(body) {
    try {
      const response = await api.post(`${REMOVE_BACKGROUND}`, body);
      console.log("remove bg response :", response);
      const { success, data } = response.data;
      if (success) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log("remove bg error :", error);
      return error.response.data;
    }
  }
}

export default UserApi.sharedIstance;
