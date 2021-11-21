import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Dash from "./pages/Dash";

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
    </Routes>
  );
};

export default Router;
