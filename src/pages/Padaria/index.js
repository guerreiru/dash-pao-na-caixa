import React from "react";
// import { Container } from "./styles";
import DenseTable from "../../components/Table";
import { api } from "../../services/api";
const Padaria = () => {
  const [bakery, setBakery] = React.useState([]);
  const [loading, setLoading] = React.useState(null);

  async function loadBakery(params) {
    try {
      const res = await api.get("bakery")
      setBakery(res.data.data);
    } catch (error) {
      console.log(error);
    }

    console.log(bakery)
  }

  React.useEffect(() => {
    loadBakery()
  }, [])

  return (
    <DenseTable
      label="Padarias"
      data={bakery}
    />
  );
};

export default Padaria;
