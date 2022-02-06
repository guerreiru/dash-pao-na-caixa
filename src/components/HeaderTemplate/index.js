import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import Logo from "../Logo";
import { Container, Content, ListLinks, BtnMenu, SideMenu } from "./styles";

const HeaderTemplate = ({ loc, Links }) => {
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

  if (location !== "/") {
    return (
      <Container className="noprint">
        <Content>
          <Link to={`${loc}` || "/dash"}>
            <Logo />
          </Link>
          <ListLinks>
            {<Links />}{" "}
          </ListLinks>
          <BtnMenu onClick={handleOpen}>
            <IoMenu size="20" />
          </BtnMenu>

          <SideMenu style={{ display: menuIsOpen ? "flex" : "none" }}>
            <IoCloseOutline onClick={handleOpen} />
            {<Links />}
          </SideMenu>
        </Content>
      </Container>
    );
  } else {
    return null;
  }
};

export default HeaderTemplate;
