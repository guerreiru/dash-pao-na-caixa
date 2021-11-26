import React from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { api } from "../../services/api";
import Table from "../../components/Table";
import FormBakery from "../../components/FormBakery";
import { TableHeader, SearchInput } from "./styles";

const Padaria = () => {
  const [bakeries, setBakeries] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    loadBakeries();
  }, []);

  async function loadBakeries() {
    try {
      const res = await api.get("bakeries");
      setBakeries(res.data.data);
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
      for (var j = 0; j < bakeries.length; j++) {
        if (bakeries[j].name.toLowerCase().match(str.toLowerCase())) {
          results.push(bakeries[j]);
          setResults(results);
        }
      }
    } else if (str.length === 0) {
      clearBusca()
    }
  }

  function clearBusca() {
    setBusca("");
    setResults([]);
  }

  return (
    <>
      <TableHeader>
        <h3>Padarias</h3>
        {location.pathname === "/dash/padarias" && (
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
            <Table label="Padarias" data={results.length > 0 ? results : bakeries} apiRoute="bakeries"></Table>
          }
        />
        <Route
          path="adicionar"
          element={<FormBakery label="Adicionar Padaria" />}
        />
      </Routes>
    </>
  );
};

export default Padaria;
