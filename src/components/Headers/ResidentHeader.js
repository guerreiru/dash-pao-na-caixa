import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import HeaderTemplate from "../HeaderTemplate";
import { useCart } from "../../hooks/useCart";
import DropDown from "../DropDown";
import { DropDownBtn } from "./styles";

const PadariaHeader = () => {
  const { cart } = useCart();
  const cartSize = React.useMemo(() => cart.length, [cart]);
  const ItemLinks = () => {
    return (
      <>
        <Link to="/produtos">
          <Badge badgeContent="">
            Produtos
          </Badge>
        </Link>
        <Link to="/caixa">
          <Badge badgeContent={cartSize} color="primary">
            Caixa
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

export default PadariaHeader;
