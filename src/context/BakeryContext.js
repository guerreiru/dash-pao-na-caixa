import React from "react";
import { api } from "../services/api";

export const BakeryContext = React.createContext();

export const BakeryStorage = ({ children }) => {
  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await api.get("bakeries");
    const data = await res.data.data;
    setdata(data);
  }

  function bakeryOptions() {
    return data.map((value) => {
      return {
        label: value.name,
        id: value.id
      }
    });
  }

  return (
    <BakeryContext.Provider value={{data, bakeryOptions}}>
      {children}
    </BakeryContext.Provider>
  );
};
