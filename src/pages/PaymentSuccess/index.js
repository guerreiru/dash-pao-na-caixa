import { Alert } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { api } from "../../services/api";
import { Container, Content, TableContainer } from "./styles";


const ConfirmPayment = () => {
  const { setCart } = useCart();
  const navigate = useNavigate();
  const search = useLocation().search;
  const paymentId = new URLSearchParams(search).get('payment_id');
  const [payment, setPayment] = React.useState(false)

  React.useEffect(() => {
    api.put(`/purchase-order-payments/status/${paymentId}`, {}).then(res => {
      setCart([])
      navigate("/dash")
      setPayment(true)
    })
  }, [paymentId, navigate, setCart])

  return (
    <Container>
      <Content>
        {!payment ? (
          <TableContainer>
            <Alert severity="success">
              Seu pagamento foi confirmado!
            </Alert>
          </TableContainer>
        ) : null}

      </Content>
    </Container>
  );
};

export default ConfirmPayment;
