import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dash from "./pages/Dash";
import Padaria from "./pages/Padaria";
import FormPadaria from "./pages/FormPadaria";
import Condominio from "./pages/Condominio";
import FormCondominio from "./pages/FormCondominio";

import SubscriptionPlan from "./pages/SubscriptionPlan";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash" element={<Dash />} />

      <Route path="/padarias" element={<Padaria />} />
      <Route path="/padarias/adicionar" element={<FormPadaria />} />

      <Route path="/condominios" element={<Condominio />} />
      <Route path="/condominios/adicionar" element={<FormCondominio />} />


      <Route path="/home" exact element={<Home />} />
      <Route path="/planos" element={<SubscriptionPlan />} />
    </Routes>
  );
};

export default Router;
