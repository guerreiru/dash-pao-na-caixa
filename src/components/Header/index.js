import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import Logo from "../Logo";
import { Container, Content, ListLinks, BtnMenu, SideMenu } from "./styles";
import { isAllowedByRole, isAuth } from "../../utils/Functions/Auth";

const Header = ({ children, loc }, props) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const navigate = useNavigate();
  window.addEventListener("resize", function () {
    if (window.outerWidth >= 768) {
      setMenuIsOpen(false);
    }
  });

  function handleOpen() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  const ItemLinks = () => {
    return (
      <>
        <Link to="/padarias">Padarias</Link>
        <Link to="/condominios">Condomínios</Link>
        {isAllowedByRole(["ROLE_ADMIN", "ROLE_ROOT"]) ? (
          <>
            <Link to="/usuarios">Usuários</Link>
            <Link to="/planos">Planos</Link>
          </>
        ) : null}
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/categorias">Categorias</Link>
        {isAuth() ? (
          <Link to="/" onClick={handleLogout}>
            Sair
          </Link>
        ) : null}
      </>
    );
  };

  return (
    <Container className="noprint">
      <Content>
        <Link to={`${loc}` || "/"}>
          <Logo />
        </Link>
        <ListLinks>{<ItemLinks />}</ListLinks>
        <BtnMenu onClick={handleOpen}>
          <IoMenu size="20" />
        </BtnMenu>

        <SideMenu style={{ display: menuIsOpen ? "flex" : "none" }}>
          <IoCloseOutline onClick={handleOpen} />
          {<ItemLinks />}
        </SideMenu>
      </Content>
    </Container>
  );
};

export default Header;
