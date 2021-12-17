import React from "react";
import Header from "../../components/Header";
import { Container, Content } from "./styles";
import imgError from "../../assets/error-401.svg";

const Error401 = () => {
  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <h1>Você não tem permissão para acessar este recurso!</h1>
        <div>
          <img src={imgError} alt="Error 401" />
        </div>
      </Content>
    </Container>
  );
};

export default Error401;
