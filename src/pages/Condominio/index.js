import React from "react";
// import { Container } from "./styles";
import DenseTable from "../../components/Table";
import { api } from "../../services/api";
const Condominio = () => {
  const [condominium, setCondominium] = React.useState([]);
  const [loading, setLoading] = React.useState(null);

  async function loadCondominium() {
    try {
      const res = await api.get("condominium");
      setCondominium(res.data.data);
    } catch (error) {
      console.log(error);
    }

    console.log(condominium);
  }

  React.useEffect(() => {
    loadCondominium();
  }, []);

  return <DenseTable label="Condominios" data={condominium} />;
};

export default Condominio;
