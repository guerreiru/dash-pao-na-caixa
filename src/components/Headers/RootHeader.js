import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import HeaderTemplate from "../HeaderTemplate";
import { DropDownBtn } from './styles';
import DropDown from "../DropDown";

const RootHeader = () => {
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
        <Link to="/planos">
          <Badge badgeContent="">
            Planos
          </Badge>
        </Link>
        <Link to="/pedidos">
          <Badge badgeContent="">
            Pedidos
          </Badge>
        </Link>
        <DropDownBtn href="/" onClick={(e) => e.preventDefault()}>
          <Badge badgeContent="">
            <DropDown></DropDown>
          </Badge>
        </DropDownBtn>
      </>
    );
  };

  return (
    <div>
      <HeaderTemplate loc="/dash" Links={ItemLinks} />
    </div>
  );
};

export default RootHeader;
