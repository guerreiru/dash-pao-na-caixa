import React from "react";
import { api } from "../services/api";

export const BakeryContext = React.createContext();

export const BakeryStorage = ({ children }) => {
  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    loadData()
  }, []);

  async function loadData() {
    const res = await api.get("bakery")
    const data = await res.data.data
    setdata(data);
  }

  return (
    <BakeryContext.Provider value={data}>
      {children}
    </BakeryContext.Provider>
  );
};
