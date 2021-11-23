import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Router from "./routes";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}
