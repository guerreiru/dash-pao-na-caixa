import React from "react";
import { Logo } from "./styles";
import logoImage from "../../assets/logo.svg"

const index = ({size}) => {
  return (
    <Logo>
      <img src={logoImage} alt="logo" width="40"/>
    </Logo>
  );
};

export default index;
