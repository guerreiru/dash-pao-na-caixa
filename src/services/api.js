import axios from "axios";
import { isAuth } from "../utils/Functions/Auth";

const api = axios.create({
  baseURL: "http://pao-na-caixa-dev.herokuapp.com/",
});

api.interceptors.request.use(
  async function (config) {
    try {
      const auth = await isAuth();
      if (auth) {
        const authData = localStorage.getItem("authData");
        if (authData) {
          const authDataParsed = JSON.parse(authData);
          config.headers.Authorization = `Bearer ${authDataParsed.access_token}`;
        }
        return config;
      }
    } catch (error) {
      throw new axios.Cancel("Token invalido");
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { api };
