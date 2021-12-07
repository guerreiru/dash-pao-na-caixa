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
import CondominioResidents from "./pages/CondominioPages/CondominioResidents";
import FormCondominioResident from "./pages/CondominioPages/FormCondominioResident";

import Person from "./pages/PersonPages/Person";
import FormPerson from "./pages/PersonPages/FormPerson";

import SubscriptionPlanForm from "./pages/SubscriptionPages/SubscriptionPlanForm";
import SubscriptionPlanList from "./pages/SubscriptionPages/SubscriptionPlanList";

import PedidosList from "./pages/PedidosPages/PedidosList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash" element={<Dash />} />

      <Route path="/padarias" element={<Padaria />} />
      <Route path="/padarias/adicionar" element={<FormPadaria />} />
      <Route path="/padarias/:id/editar" element={<FormPadaria />} />
      <Route path="/padarias/:id/usuarios" element={<PadariaUsers />} />
      <Route path="/padarias/:id/usuarios/adicionar" element={<FormPadariaUser />} />

      <Route path="/condominios" element={<Condominio />} />
      <Route path="/condominios/adicionar" element={<FormCondominio />} />
      <Route path="/condominios/:id/editar" element={<FormCondominio />} />
      <Route path="/condominios/:id/usuarios" element={<CondominioResidents />} />
      <Route path="/condominios/:id/usuarios/adicionar" element={<FormCondominioResident />} />

      <Route path="/usuarios" element={<Person />} />
      <Route path="/usuarios/adicionar" element={<FormPerson />} />
      <Route path="/usuarios/:id/editar" element={<FormPerson />} />

      <Route path="/planos" element={<SubscriptionPlanList />} />
      <Route path="/planos/adicionar" element={<SubscriptionPlanForm />} />
      <Route path="/planos/:id/editar" element={<SubscriptionPlanForm />} />

      <Route path="/pedidos" element={<PedidosList />} />
    </Routes>
  );
};

export default Router;
