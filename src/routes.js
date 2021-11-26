import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import SubscriptionPlan from "./pages/SubscriptionPlan";

const isAuth = true
const PrivateRoute = ({ children }) => {
  const authed = isAuth
  return authed ? children : <Navigate to="/" />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dash/*"
        element={
          <PrivateRoute><Dash /></PrivateRoute>
        }
      />
      <Route path="/planos" element={<SubscriptionPlan />} />
    </Routes>
  );
};

export default Router;
