import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Container, Content, ListLinks } from "./styles";

const index = ({ children, loc, setBreadcrumb }) => {
  return (
    <Container>
      <Content>
        <Link onClick={() => setBreadcrumb("")} to={`${loc}` || "/"}>
          <Logo />
        </Link>
        <ListLinks>{children}</ListLinks>
      </Content>
    </Container>
  );
};

export default index;
