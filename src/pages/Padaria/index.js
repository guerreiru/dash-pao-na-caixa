import React from "react";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { api } from "../../services/api";
import Table from "../../components/Table";
import FormBakery from "../../components/FormBakery";

const Padaria = () => {
  const [bakery, setBakery] = React.useState([]);
  const navigate = useNavigate();

  async function loadBakery() {
    try {
      const res = await api.get("bakery");
      setBakery(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAdd() {
    navigate("adicionar");
  }

  React.useEffect(() => {
    loadBakery();
  }, [setBakery]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Table label="Padarias" data={bakery}>
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
      <Route path="adicionar" element={<FormBakery label="Adicionar Padaria" />} />
    </Routes>
  );
};

export default Padaria;
