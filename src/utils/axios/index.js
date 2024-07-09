import axios from "axios";
import LocalStorage from "../../managers/LocalStorage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: `${BACKEND_URL}`,
});

// Adding auth Header Globaly ..
api.interceptors.request.use(function (config) {
  try {
    let token = LocalStorage.getToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
  } catch (error) {
    console.log("Error in setting auth header globally !", error);
  }
});

export default api;
