import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import Logo from "../Logo";
import { Container, Content, ListLinks, BtnMenu, SideMenu } from "./styles";
import { isAllowedByRole } from "../../utils/Functions/Auth";

const Header = ({ loc }) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const location = useLocation().pathname;

  window.addEventListener("resize", function () {
    if (window.outerWidth >= 768) {
      setMenuIsOpen(false);
    }
  });

  function handleOpen() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleLogout() {
    localStorage.removeItem("authData");
  }

  const ItemLinks = () => {
    return (
      <>
        {isAllowedByRole(["ROLE_BAKERY", "ROLE_ADMIN", "ROLE_ROOT"]) ? (
          <Link to="/padarias">Padarias</Link>
        ) : null}
        <Link to="/condominios">Condomínios</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/" onClick={handleLogout}>
          Sair
        </Link>
      </>
    );
  };

  if (location !== "/") {
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
  } else {
    return null;
  }
};

export default Header;
