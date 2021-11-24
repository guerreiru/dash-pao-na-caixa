import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyles from "./styles/globalStyles";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { BakeryStorage } from "./context/BakeryContext";

export default function App() {
  return (
    <BakeryStorage>
      <BrowserRouter>
        <GlobalStyles />
        <ToastContainer autoClose={2000} />
        <Router />
      </BrowserRouter>
    </BakeryStorage>
  );
}
