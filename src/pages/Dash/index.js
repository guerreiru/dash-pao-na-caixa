import React from "react";
import { Container, Content, TableContainer } from "./styles";
import { api } from "../../services/api";

const Dash = () => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    async function loadUserInfo() {
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
