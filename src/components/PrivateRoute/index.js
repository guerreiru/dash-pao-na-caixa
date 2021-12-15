import React from "react";
import { Navigate } from "react-router-dom";
import { isAllowedByRole, isAuth } from "../../utils/Functions/Auth";

const PrivateRoute = ({ children, allowedRoutes }) => {
  const auth = isAuth();

  return auth && isAllowedByRole(allowedRoutes) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default PrivateRoute;
