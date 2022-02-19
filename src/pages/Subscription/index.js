import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Container, Content, TableContainer } from "./styles";
import { FormatPrice } from "../../utils/Functions/FormatPrice";

const Subscription = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    api.get("subscriptions").then((res) => {
      if (mounted) {
        setSubscription(res.data);
        setloading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <Content>
          <TableContainer>
            <h3>Aguarde...</h3>
          </TableContainer>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Content>
          <TableContainer>
            {subscription.isActive ? (
              <>
                <h3>Assinatura</h3>
                <div style={{ margin: "10px 0" }}>
                  <p>Plano: Básico</p>
                  <p>Preço: {FormatPrice(subscription.price)}</p>
                </div>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => navigate(`/planos`)}
                >
                  Mudar plano
                </Button>
              </>
            ) : (
              <>
                <h3>Assinatura</h3>
                <div style={{ margin: "10px 0" }}>
                  <p>Nenhuma assinatura!</p>
                </div>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => navigate(`/planos`)}
                >
                  Assinar um Plano
                </Button>
              </>
            )}
          </TableContainer>
        </Content>
      </Container>
    );
  }
};

export default Subscription;
