import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dash from "./pages/Dash";

import Padaria from "./pages/PadariaPages/Padaria";
import FormPadaria from "./pages/PadariaPages/FormPadaria";
import FormPadariaUser from "./pages/PadariaPages/FormPadariaUser";
import PadariaUsers from "./pages/PadariaPages/PadariaUsers";


import Condominio from "./pages/CondominioPages/Condominio";
import FormCondominio from "./pages/CondominioPages/FormCondominio";

import Person from "./pages/Person";

import SubscriptionPlan from "./pages/SubscriptionPlan";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash" element={<Dash />} />

      <Route path="/padarias" element={<Padaria />} />
      <Route path="/padarias/adicionar" element={<FormPadaria />} />
      <Route path="/padarias/:id/users" element={<PadariaUsers />} />
      <Route path="/padarias/:id/users/adicionar" element={<FormPadariaUser />} />

      <Route path="/condominios" element={<Condominio />} />
      <Route path="/condominios/adicionar" element={<FormCondominio />} />

      <Route path="/usuarios" element={<Person />} />

      <Route path="/planos" element={<SubscriptionPlan />} />
    </Routes>
  );
};

export default Router;
