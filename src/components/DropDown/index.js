import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from "./styles";
import { getUserConfig } from '../../utils/Functions/Auth';

const DropDown = ({ children, name }) => {
  const [user, setUser] = React.useState("");

  React.useMemo(() => {
    setUser(getUserConfig().user_name);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authData");
  }

  return <Container>
    <div className="dropdown">
      <span>{user ? `${user}` : "Usuário"}</span>
      <div className="dropdown-content">
        <p>
          <NavLink to="/perfil" >
            Perfil
          </NavLink>
        </p>
        <p>
          <NavLink to={`/${getUserConfig().id}/cartoes`} >
            Cartões
          </NavLink>
        </p>
        <p>
          <NavLink to={`/${getUserConfig().id}/assinatura`} >
            Assinatura
          </NavLink>
        </p>
        {children}
        <p onClick={() => handleLogout()}>
          <NavLink to="/" >
            Sair
          </NavLink>
        </p>
      </div>
    </div>
  </Container>;
};

export default DropDown