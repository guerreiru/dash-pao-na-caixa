import React from "react";
import { api } from "../services/api";

export const BakeryContext = React.createContext();

export const BakeryStorage = ({ children }) => {
  const [bakeries, setBakeries] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await api.get("bakeries");
    const bakeries = await res.data.data;
    setBakeries(bakeries);
  }

  function bakeryOptions() {
    return bakeries.map((value) => {
      return {
        label: value.name,
        id: value.id
      }
    });
  }

  return (
    <BakeryContext.Provider value={{bakeries, bakeryOptions}}>
      {children}
    </BakeryContext.Provider>
  );
};
