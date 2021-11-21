import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Dash from "./pages/Dash";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash/*" element={<Dash />} />
    </Routes>
  );
};

export default Router;