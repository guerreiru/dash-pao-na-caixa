import React from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { api } from "../../services/api";
import Table from "../../components/Table";
import FormCondominio from "../../components/FormCondominium";
import { TableHeader, SearchInput } from "./styles";

const Condominio = () => {
  const [condominiums, setCondominiums] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    loadCondominiums();
  }, []);

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

  function searchStringInArray(str) {
    setBusca(str);
    const results = [];
    if (str.length > 2) {
      for (var j = 0; j < condominiums.length; j++) {
        if (condominiums[j].name.toLowerCase().match(str.toLowerCase())) {
          results.push(condominiums[j]);
          setCondominiums(results);
        }
      }
    }
  }

  function clearBusca() {
    setBusca("");
    loadCondominiums();
  }

  return (
    <>
      <TableHeader>
        <h3>Condomínios</h3>
        {location.pathname === "/dash/condominios" && (
          <SearchInput>
            <FaSearch color="#737373" onClick={searchStringInArray} />
            <input
              value={busca}
              onChange={({ target }) => searchStringInArray(target.value)}
              type="text"
              placeholder="Pesquisar"
            />
            {busca && <TiDeleteOutline color="#737373" onClick={clearBusca} />}
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
