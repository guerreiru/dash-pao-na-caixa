import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Container, Content, TableContainer } from "./styles";


const ConfirmPayment = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const preapprovalId = new URLSearchParams(search).get('preapproval_id');
  const [payment, setPayment] = React.useState(false)

  React.useEffect(() => {
    api.put(`/subscriptions/status/${preapprovalId}`, {}).then(res => {
      navigate("/dash")
      setPayment(true)
    })
  }, [preapprovalId, navigate])

  return (
    <Container>
      <Content>
        {!payment ? (
          <TableContainer>
            Aguarde enquanto confirmamos sua assinatura...
          </TableContainer>
        ) : null}

      </Content>
    </Container>
  );
};

export default ConfirmPayment;
