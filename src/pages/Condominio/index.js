import React from "react";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";
import Table from "../../components/Table";
import FormCondominio from "../../components/Condominio";

const Condominio = () => {
  const [condominium, setCondominium] = React.useState([]);
  const navigate = useNavigate();

  async function loadCondominium() {
    try {
      const res = await api.get("condominium");
      setCondominium(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAdd() {
    navigate("adicionar");
  }

  React.useEffect(() => {
    loadCondominium();
  }, [setCondominium]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Table label="Condomínios" data={condominium}>
            <Button
              type="button"
              variant="contained"
              startIcon={<FiPlus />}
              onClick={handleAdd}
            >
              Adicionar
            </Button>
          </Table>
        }
      />
      <Route path="adicionar" element={<FormCondominio />} />
    </Routes>
  );
};

export default Condominio;
