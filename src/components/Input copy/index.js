import React from "react";
import { Header } from "./styles";
import logo from "../../assets/logo.png";

const index = ({ setValue, type, id, name, value, ...props }) => {
  return (
    <Header>
      <img src={logo} />
    </Header>
  );
};

export default index;
