import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Router from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}
