import { getDataDecoded } from "./LocStorage";
export const isValidToken = () => {
  const { exp } = getDataDecoded("authData");

  if (exp) {
    return Date.now() <= exp * 1000;
  } else {
    return false;
  }
};

export const isAuth = () => {
  return isValidToken();
};

export const isAllowedByRole = (allowedRoutes) => {
  const { user } = getDataDecoded("authData");

  return allowedRoutes.some((role) => user.roles.includes(role));
};
