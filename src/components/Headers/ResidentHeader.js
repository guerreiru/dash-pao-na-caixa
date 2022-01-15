import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import HeaderTemplate from "../HeaderTemplate";
import { useCart } from "../../hooks/useCart";

const PadariaHeader = () => {
  const { cart } = useCart();
  const cartSize = React.useMemo(() => cart.length, [cart]);
  const ItemLinks = () => {
    return (
      <>
        <Link to="/produtos">Produtos</Link>
        <Link to="/caixa">
          <Badge badgeContent={cartSize} color="primary">
            Caixa
          </Badge>
        </Link>
        <Link to="/pedidos">Pedidos</Link>
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
