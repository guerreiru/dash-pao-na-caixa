import React from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import Logo from "../Logo";
import { Container, Content, ListLinks, BtnMenu, SideMenu } from "./styles";

const ItemLinks = () => {
  return (
    <>
      <Link to="/padarias">Padarias</Link>
      <Link to="/condominios">Condomínios</Link>
      <Link to="/usuarios">Usuários</Link>
      <Link to="/planos">Planos</Link>
      <Link to="/produtos">Produtos</Link>
      <Link to="/pedidos">Pedidos</Link>
      <Link to="/categorias">Categorias</Link>
    </>
  );
};

const Header = ({ children, loc, setBreadcrumb }, props) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  window.addEventListener("resize", function () {
    if (window.outerWidth >= 768) {
      setMenuIsOpen(false);
    }
  });

  function handleOpen() {
    setMenuIsOpen(!menuIsOpen);
  }
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
