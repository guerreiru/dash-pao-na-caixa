import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dash from "./pages/Dash";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";
import Subscription from "./pages/Subscription";

import Bakery from "./pages/BakeryPages/Bakery";
import BakeryForm from "./pages/BakeryPages/BakeryForm";
import BakeryFormUser from "./pages/BakeryPages/BakeryFormUser";
import BakeryUsers from "./pages/BakeryPages/BakeryUsers";
import ConfirmPayment from "./pages/ConfirmPayment";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentSuccess from "./pages/PaymentSuccess";

import Condominium from "./pages/CondominiumPages/Condominium";
import CondominiumForm from "./pages/CondominiumPages/CondominiumForm";
import CondominiumResidents from "./pages/CondominiumPages/CondominiumResidents";
import CondominiumFormResident from "./pages/CondominiumPages/CondominiumFormResident";

import Person from "./pages/PersonPages/Person";
import FormPerson from "./pages/PersonPages/FormPerson";

import SubscriptionPlanForm from "./pages/SubscriptionPages/SubscriptionPlanForm";
import SubscriptionPlanList from "./pages/SubscriptionPages/SubscriptionPlanList";

import Purchase from "./pages/PurchasePages";

import CategoryList from "./pages/ProductsPages/CategoryList";
import CategoryForm from "./pages/ProductsPages/CategoryForm";

import ProductList from "./pages/ProductsPages/ProductsList";
import ProductForm from "./pages/ProductsPages/ProductForm";
import Cart from "./pages/Cart"
import PrivateRoute from "./components/PrivateRoute";
import Error401 from "./pages/Error401";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/dash" element={<Dash />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/confirma-assinatura" element={<ConfirmPayment />} />
      <Route path="/pagamento_confirmado" element={<PaymentSuccess />} />
      <Route path="/pagamento_falho" element={<PaymentFailed />} />

      <Route
        path="/:id/cartoes"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_RESIDENT",
            ]}
          >
            <Cards />
          </PrivateRoute>
        }
      />

      <Route
        path="/:id/assinatura"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_RESIDENT",
            ]}
          >
            <Subscription />
          </PrivateRoute>
        }
      />

      <Route
        path="/padarias"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <Bakery />
          </PrivateRoute>
        }
      />

      <Route
        path="/padarias/adicionar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <BakeryForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/padarias/:id/editar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <BakeryForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/padarias/:id/usuarios"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <BakeryUsers />
          </PrivateRoute>
        }
      />

      <Route
        path="/padarias/:id/usuarios/adicionar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <BakeryFormUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/condominios"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <Condominium />
          </PrivateRoute>
        }
      />

      <Route
        path="/condominios/adicionar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <CondominiumForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/condominios/:id/editar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <CondominiumForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/condominios/:id/usuarios"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <CondominiumResidents />
          </PrivateRoute>
        }
      />

      <Route
        path="/condominios/:id/usuarios/adicionar"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <CondominiumFormResident />
          </PrivateRoute>
        }
      />

      <Route path="/usuarios" element={<Person />} />
      <Route path="/usuarios/adicionar" element={<FormPerson />} />
      <Route path="/usuarios/:id/editar" element={<FormPerson />} />

      <Route path="/planos" element={<SubscriptionPlanList />} />
      <Route path="/planos/adicionar" element={<SubscriptionPlanForm />} />
      <Route path="/planos/:id/editar" element={<SubscriptionPlanForm />} />

      <Route path="/pedidos" element={<Purchase />} />

      <Route path="/categorias" element={<CategoryList />} />
      <Route path="/categorias/adicionar" element={<CategoryForm />} />
      <Route path="/categorias/:id/editar" element={<CategoryForm />} />

      <Route
        path="/produtos"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_RESIDENT",
              "ROLE_BAKERY",
              "ROLE_CONDOMINIUM",
              "ROLE_ADMIN",
              "ROLE_ROOT",
            ]}
          >
            <ProductList />
          </PrivateRoute>
        }
      />

      <Route path="/produtos/adicionar" element={<ProductForm />} />
      <Route path="/produtos/:productId/editar" element={<ProductForm />} />

      <Route
        path="/caixa"
        element={
          <PrivateRoute
            allowedRoutes={[
              "ROLE_RESIDENT",
            ]}
          >
            <Cart />
          </PrivateRoute>
        }
      />

      <Route path="/unauthorized" element={<Error401 />} />
    </Routes>
  );
};

export default Router;
