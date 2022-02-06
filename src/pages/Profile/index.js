import React from "react";
import { Link } from "react-router-dom";
import { Container, Content, TableContainer } from "./styles";
import { api } from "../../services/api";

const Profile = () => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    async function loadUserInfo() {
      const user = await api.get("users/profile");
      setUser(user.data);
    }
    loadUserInfo();
  }, []);

  return (
    <Container>
      <Content>
        <TableContainer>
          {user.person ? (
            <>
              <p>Nome: {user.person.name || ""}</p>
              <p>Telefone: {user.person.cell_phone || ""}</p>
              <p>Email: {user.person.email || ""}</p>
              {user.person.resident ? (
                <p>Apartamento: {user.person.resident.apartment_number}</p>
              ) : null}
              <p>
                <Link to={`/${user.id}/cartoes`} >Cartões</Link>
              </p>
              <p>
                <Link to={`/${user.id}/assinatura`} >Assinatura</Link>
              </p>
            </>
          ) : null}
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Profile;
