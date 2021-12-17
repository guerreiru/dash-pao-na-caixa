import React from "react";
import { Navigate } from "react-router-dom";
import { isAllowedByRole, isAuth } from "../../utils/Functions/Auth";

const PrivateRoute = ({ children, allowedRoutes }) => {
  const auth = isAuth();

  if (!auth) {
    return <Navigate to="/" />;
  } else if (auth && isAllowedByRole(allowedRoutes)) {
    return children;
  } else if (auth && !isAllowedByRole(allowedRoutes)) {
    return <Navigate to="/unauthorized" />;
  }
};

export default PrivateRoute;
