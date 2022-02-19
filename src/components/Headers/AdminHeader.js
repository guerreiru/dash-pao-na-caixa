import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import HeaderTemplate from "../HeaderTemplate";

const AdminHeader = () => {
  const ItemLinks = () => {
    return (
      <>
        <Link to="/padarias">
          <Badge badgeContent="">
            Padarias
          </Badge>
        </Link>
        <Link to="/condominios">
          <Badge badgeContent="">
            Condomínios
          </Badge>
        </Link>
        <Link to="/pedidos">
          <Badge badgeContent="">
            Pedidos
          </Badge>
        </Link>
        <Link to="/categorias">
          <Badge badgeContent="">
            Categorias
          </Badge>
        </Link>
        <Link to="/unidade/adicionar">
          <Badge badgeContent="">
            Unidades
          </Badge>
        </Link>
      </>
    );
  };

  return (
    <div>
      <HeaderTemplate loc="/dash" Links={ItemLinks} />
    </div>
  );
};

export default AdminHeader;
