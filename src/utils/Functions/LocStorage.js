import jwtDecode from "jwt-decode";

export const saveDataLocal = (key, value) => {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getDataLocal = (key) => {
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  return data;
};

export const getDataDecoded = (key) => {
  const data = getDataLocal(key);
  if (data.access_token) {
    return jwtDecode(data.access_token);
  } else {
    return false;
  }
};
