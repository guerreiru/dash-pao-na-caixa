import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Content } from "./styles";

const Error401 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header loc="/" />
      <Content></Content>
    </Container>
  );
};

export default Error401;
