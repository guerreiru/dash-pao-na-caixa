import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyles from "./styles/globalStyles";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { CartProvider } from "./hooks/useCart";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <ToastContainer autoClose={2000} />
        <Header>
          <Router />
        </Header>
      </CartProvider>
    </BrowserRouter>
  );
}
