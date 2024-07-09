import { GET_CARS, CREATE_CAR } from "../apiConstants";
import { api } from "../../utils";

class CarApi {
  static sharedIstance = new CarApi();

  constructor() {
    if (CarApi.sharedIstance != null) {
      return CarApi.sharedIstance;
    }
  }
  //   Get dealership lists
  async getCars() {
    try {
      const response = await api.get(GET_CARS);
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
  //   Create dealership
  async createCar(body) {
    try {
      const response = await api.post(CREATE_CAR, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CarApi.sharedIstance;
