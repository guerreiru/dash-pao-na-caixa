import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import HeaderTemplate from "../HeaderTemplate";
import { useCart } from "../../hooks/useCart";

const AdminHeader = () => {
  const { cart } = useCart();
  const cartSize = React.useMemo(() => cart.length, [cart]);
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
        <Link to="/caixa">
          <Badge badgeContent={cartSize} color="primary">
            Minha Caixa
          </Badge>
        </Link>
        <Link to="/pedidos">
          <Badge badgeContent="">
            Pedidos
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
