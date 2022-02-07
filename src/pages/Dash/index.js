import React from "react";
import { Container, Content, TableContainer } from "./styles";
import { api } from "../../services/api";

const Dash = () => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    async function loadUserInfo() {
      const user = await api.get("users/profile");
      // const subscription = await api.get("subscriptions");
      setUser(user.data);
    }
    loadUserInfo();
  }, []);

  return (
    <Container>
      <Content>
        <TableContainer>
          {user.person ? `Olá ${user.person.name}!` : null}
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Dash;
