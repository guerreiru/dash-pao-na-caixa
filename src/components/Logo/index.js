import React from "react";
import { Logo } from "./styles";

const index = ({size}) => {
  return (
    <Logo style={{fontSize: `${size} || 2em`}} >
      <span>Pão </span>na caixa
    </Logo>
  );
};

export default index;
