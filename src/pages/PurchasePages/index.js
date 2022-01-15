import React from 'react'
import PurchaseList from './PurchaseList';
import PurchaseHistory from './PurchaseHistory';
import jwtDecode from "jwt-decode";

const Purchase = () => {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const user = localStorage.getItem("authData");
    if (user) {
      const userParsed = JSON.parse(user);
      const userDecoded = jwtDecode(userParsed.access_token);
      setRole(userDecoded.user.roles[0]);
    }
  }, [role]);

  if (role === "ROLE_RESIDENT") {
    return <PurchaseHistory />
  } else {
    return <PurchaseList />
  }
}

export default Purchase
