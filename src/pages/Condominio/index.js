import React from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { api } from "../../services/api";
import Table from "../../components/Table";
import FormCondominio from "../../components/FormCondominium";
import { TableHeader, SearchInput } from "./styles";

const Condominio = () => {
  const [condominiums, setCondominiums] = React.useState([]);
  const navigate = useNavigate();
  let location = useLocation();

  async function loadCondominiums() {
    try {
      const res = await api.get("condominiums");
      setCondominiums(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAdd() {
    navigate("adicionar");
  }

  React.useEffect(() => {
    loadCondominiums();
  }, []);

  return (
    <>
      <TableHeader>
        <h3>Condomínios</h3>
        {location.pathname === "/dash/condominios" && (
          <SearchInput>
            <FaSearch color="#737373" />
            <input type="search" placeholder="Pesquisar" />
          </SearchInput>
        )}
        <Button
          type="button"
          variant="contained"
          startIcon={<FiPlus />}
          onClick={handleAdd}
        >
          Adicionar
        </Button>
      </TableHeader>
      <Routes>
        <Route
          path="/"
          element={
            <Table
              label="Condomínios"
              data={condominiums}
              apiRoute="condominiums"
            >
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
        <Route
          path="adicionar"
          element={<FormCondominio label="Adicionar condomínio" />}
        />
      </Routes>
    </>
  );
};

export default Condominio;
