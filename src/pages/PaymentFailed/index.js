import { Alert } from "@material-ui/core";
import React from "react";
import { Container, Content, TableContainer } from "./styles";


const PaymentFailed = () => {

  return (
    <Container>
      <Content>
        <TableContainer>
          <Alert severity="error">
            Seu pagamento foi recusado!
          </Alert>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default PaymentFailed;
