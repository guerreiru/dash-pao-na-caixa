import React from "react";
import PurchaseList from "./PurchaseList";
import PurchaseHistory from "./PurchaseHistory";
import jwtDecode from "jwt-decode";

const Purchase = () => {
  const [role, setRole] = React.useState("");
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      const user = localStorage.getItem("authData");
      if (user) {
        const userParsed = JSON.parse(user);
        const userDecoded = jwtDecode(userParsed.access_token);
        setRole(userDecoded.user.roles[0]);
      }
      setloading(false);
    }

    return function cleanup() {
      mounted = false;
    };
  }, [role]);

  if (loading) {
    return <p>Carregando....</p>;
  } else {
    if (role === "ROLE_RESIDENT") {
      return <PurchaseHistory />;
    } else {
      return <PurchaseList />;
    }
  }
};

export default Purchase;
