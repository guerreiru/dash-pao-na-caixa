import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dash from "./pages/Dash";

import Bakery from "./pages/BakeryPages/Bakery";
import BakeryForm from "./pages/BakeryPages/BakeryForm";
import BakeryFormUser from "./pages/BakeryPages/BakeryFormUser";
import BakeryUsers from "./pages/BakeryPages/BakeryUsers";

import Condominium from "./pages/CondominiumPages/Condominium";
import CondominiumForm from "./pages/CondominiumPages/CondominiumForm";
import CondominiumResidents from "./pages/CondominiumPages/CondominiumResidents";
import CondominiumFormResident from "./pages/CondominiumPages/CondominiumFormResident";

import Person from "./pages/PersonPages/Person";
import FormPerson from "./pages/PersonPages/FormPerson";

import SubscriptionPlanForm from "./pages/SubscriptionPages/SubscriptionPlanForm";
import SubscriptionPlanList from "./pages/SubscriptionPages/SubscriptionPlanList";

import PurchaseList from "./pages/PurchasePages/PurchaseList";

import CategoryList from "./pages/ProductsPages/CategoryList";
import CategoryForm from "./pages/ProductsPages/CategoryForm";

import ProductForm from "./pages/ProductsPages/ProductForm";


const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash" element={<Dash />} />

      <Route path="/padarias" element={<Bakery />} />
      <Route path="/padarias/adicionar" element={<BakeryForm />} />
      <Route path="/padarias/:id/editar" element={<BakeryForm />} />
      <Route path="/padarias/:id/usuarios" element={<BakeryUsers />} />
      <Route path="/padarias/:id/usuarios/adicionar" element={<BakeryFormUser />} />

      <Route path="/condominios" element={<Condominium />} />
      <Route path="/condominios/adicionar" element={<CondominiumForm />} />
      <Route path="/condominios/:id/editar" element={<CondominiumForm />} />
      <Route path="/condominios/:id/usuarios" element={<CondominiumResidents />} />
      <Route path="/condominios/:id/usuarios/adicionar" element={<CondominiumFormResident />} />

      <Route path="/usuarios" element={<Person />} />
      <Route path="/usuarios/adicionar" element={<FormPerson />} />
      <Route path="/usuarios/:id/editar" element={<FormPerson />} />

      <Route path="/planos" element={<SubscriptionPlanList />} />
      <Route path="/planos/adicionar" element={<SubscriptionPlanForm />} />
      <Route path="/planos/:id/editar" element={<SubscriptionPlanForm />} />

      <Route path="/pedidos" element={<PurchaseList />} />

      <Route path="/categorias" element={<CategoryList />} />
      <Route path="/categorias/adicionar" element={<CategoryForm />} />
      <Route path="/categorias/:id/editar" element={<CategoryForm />} />

      <Route path="/produtos/adicionar" element={<ProductForm />} />

    </Routes>
  );
};

export default Router;
