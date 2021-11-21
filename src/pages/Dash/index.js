import React from "react";
import { Breadcrumbs } from "@material-ui/core";
import { Link, Routes, Route } from "react-router-dom";
import { Container, Content, TableContainer } from "./styles";
import Header from "../../components/Header";
import Padaria from "../Padaria";
import Condominio from "../Condominio";

const Dash = () => {
  const [breadcrumb, setBreadcrumb] = React.useState("");

  function handleBreadcrumbs(value) {
    setBreadcrumb(value);
  }
  return (
    <Container>
      <Header setBreadcrumb={setBreadcrumb} loc="/dash">
        <Link to="padarias" onClick={() => handleBreadcrumbs("padarias")}>
          Padaria
        </Link>
        <Link to="condominios" onClick={() => handleBreadcrumbs("condominios")}>
          Condomínio
        </Link>
        <Link to="/assinaturas">Assinatura</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/relatorios">Relatórios</Link>
        <Link to="/">Usuário</Link>
      </Header>
      <Content>
        <TableContainer>
          <Breadcrumbs aria-label="breadcrumb" separator=">">
            <Link to="/dash" onClick={() => handleBreadcrumbs("")}>
              Home
            </Link>
            {breadcrumb.length !== "" ? (
              <Link to={`${breadcrumb}`}>{breadcrumb}</Link>
            ) : null}
          </Breadcrumbs>
          <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="padarias" element={<Padaria />} />
            <Route path="condominios" element={<Condominio />} />
          </Routes>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Dash;
