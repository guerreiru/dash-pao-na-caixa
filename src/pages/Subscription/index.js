import React from "react";
import { Button } from "@material-ui/core";
import { Container, Content, TableContainer } from "./styles";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <TableContainer>
          <h3>Assinatura</h3>
          <div style={{ margin: "10px 0" }}>
            <p>Plano: Básico</p>
            <p>Preço: R$ 25,00</p>
          </div>
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate(`/planos`)}
          >
            Assinar um Plano
          </Button>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Subscription;
