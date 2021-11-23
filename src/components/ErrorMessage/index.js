import React from "react";
import { ErrorMessage } from "./styles";

const index = ({message}) => {
  return (
    <ErrorMessage>{message}</ErrorMessage>
  );
};

export default index;
