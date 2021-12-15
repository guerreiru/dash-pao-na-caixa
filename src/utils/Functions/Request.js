import { api } from "../../services/api";
import qs from "qs";
import axios from "axios";
import { getDataDecoded, saveDataLocal } from "./LocStorage";

const BASE_URL = "http://pao-na-caixa-dev.herokuapp.com/";

export const makeRequest = ({ method = "GET", url, data, params }) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
  });
};

export const makePrivateRequest = ({ method = "GET", url, data, params }) => {
  const sessionData = getDataDecoded("authData");

  const headers = {
    Authorization: `Bearer ${sessionData.access_token}`,
  };

  return makeRequest({ method, url, data, params, headers });
};

export const makeLogin = async (username, password) => {
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: "Basic cGFvLW5hLWNhaXhhOnMzY3JldA==",
  };
  const payload = qs.stringify({
    grant_type: "password",
    username: username,
    password: password,
    scope: "ROLE_RESIDENT",
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
