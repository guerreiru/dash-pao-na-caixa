import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { saveDataLocal } from "./LocStorage";

const headers = {
  "content-type": "application/x-www-form-urlencoded",
  Authorization: "Basic cGFvLW5hLWNhaXhhOnMzY3JldA==",
};

const baseUrl = "http://pao-na-caixa-dev.herokuapp.com/";

const api = axios.create({
  baseURL: baseUrl,
});

export const getUserConfig = () => {
  const authData = localStorage.getItem("authData");
  if (authData) {
    const authDataParsed = JSON.parse(authData);
    const authDataDecoded = jwtDecode(authDataParsed.access_token);
    return authDataDecoded.user;
  }
};

export const privateRequest = async (method, url) => {
  const authData = localStorage.getItem("authData");
  if (authData) {
    const authDataParsed = JSON.parse(authData);
    const headers = {
      Authorization: `Bearer ${authDataParsed.access_token}`,
    };

    return axios({
      method,
      url,
      baseURL: baseUrl,
      headers,
    });
  }
};

export const makeLogin = async (username, password) => {
  const payload = qs.stringify({
    grant_type: "password",
    username: username,
    password: password,
    scope: "client",
  });
  const res = await api.request(`/oauth/token`, {
    method: "POST",
    headers: headers,
    data: payload,
  });

  const authData = res.data;
  saveDataLocal("authData", authData);

  return res;
};

export const refreshToken = async () => {
  const authData = localStorage.getItem("authData");
  const authDataParsed = JSON.parse(authData);

  if (authData) {
    const payload = qs.stringify({
      grant_type: "refresh_token",
      refresh_token: authDataParsed.refresh_token,
      scope: "client",
    });
    const res = await api.request(`/oauth/token`, {
      method: "POST",
      headers: headers,
      data: payload,
    });

    const authData = res.data;
    saveDataLocal("authData", authData);

    return authData.access_token;
  }
};

export const isValidToken = async () => {
  const authData = localStorage.getItem("authData");
  if (authData) {
    const authDataParsed = JSON.parse(authData);
    const authDataDecoded = jwtDecode(authDataParsed.access_token);

    if (Date.now() <= authDataDecoded.exp * 1000) {
      return authDataParsed.access_token;
    } else {
      return await refreshToken();
    }
  } else {
    return false;
  }
};

export const isAuth = () => {
  return isValidToken();
};

export const isAllowedByRole = (allowedRoutes) => {
  const authData = localStorage.getItem("authData") ?? false;
  let authDataParsed = {};
  let dataDecoded = {};

  if (authData) {
    authDataParsed = JSON.parse(authData);
    dataDecoded = jwtDecode(authDataParsed.access_token);
    return allowedRoutes.some((role) => dataDecoded.user.roles.includes(role));
  } else {
    return false;
  }
};
