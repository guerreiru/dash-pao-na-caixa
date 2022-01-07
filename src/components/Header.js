import React from "react";
import jwtDecode from "jwt-decode";
import PadariaHeader from "./Headers/PadariaHeader";
import ResidentHeader from "./Headers/ResidentHeader";

export default function Header({ children }) {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const user = localStorage.getItem("authData");
    if (user) {
      const userParsed = JSON.parse(user);
      const userDecoded = jwtDecode(userParsed.access_token);
      setRole(userDecoded.user.roles[0]);
    }
  }, [role]);

  return (
    <>
      {role === "ROLE_RESIDENT" ? <ResidentHeader /> : <PadariaHeader />}
      {children}
    </>
  );
}
