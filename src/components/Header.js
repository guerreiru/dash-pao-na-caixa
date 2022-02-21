import React from "react";
import jwtDecode from "jwt-decode";
import PadariaHeader from "./Headers/PadariaHeader";
import ResidentHeader from "./Headers/ResidentHeader";
import { useLocation } from "react-router-dom";
import RootHeader from "./Headers/RootHeader";

export default function Header({ children }) {
  const [userData, setUserData] = React.useState("");
  const [role, setRole] = React.useState("");
  const location = useLocation().pathname;

  React.useEffect(() => {
    const user = localStorage.getItem("authData");
    if (user) {
      const userParsed = JSON.parse(user);
      const userDecoded = jwtDecode(userParsed.access_token);
      setUserData(userDecoded.user);
      setRole(userDecoded.user.roles[0]);
      console.log(userDecoded.user);
    }
  }, [location]);

  if (role === "ROLE_RESIDENT") {
    return (
      <>
        <ResidentHeader userData={userData} />
        {children}
      </>
    )
  } else if (role === "ROLE_BAKERY") {
    return (
      <>
        <PadariaHeader userData={userData} />
        {children}
      </>
    )
  } else if (role === "ROLE_ROOT" || role === "ROLE_ADMIN") {
    return (
      <>
        <RootHeader userData={userData} />
        {children}
      </>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }

}
