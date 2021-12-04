import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Container,
  Content,
  SearchInput,
  TableContainer,
  TableHeader,
} from "./styles";
import Table from "../../../components/Table";
import Header from "../../../components/Header";
import { api } from "../../../services/api";

const CondominioResidents = () => {
  const [residents, setResidents] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const [condominiumsSelected, setCondominiumsSelected] = React.useState([]);
  const { id: condominiumId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadResidents() {
      try {
        const res = await api.get(`condominiums/${condominiumId}/people`);
        setResidents(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadResidents()
  }, [condominiumId]);

  React.useEffect(() => {
    async function loadBakeryInfo() {
      try {
        const res = await api.get(`condominiums/${condominiumId}`);
        setCondominiumsSelected(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadBakeryInfo()
  }, [condominiumId]);

  function handleAdd() {
    navigate("adicionar");
  }

  function searchStringInArray(str) {
    setBusca(str);
    const results = [];
    if (str.length > 2) {
      for (var j = 0; j < residents.length; j++) {
        if (residents[j].name.toLowerCase().match(str.toLowerCase())) {
          results.push(residents[j]);
          setResults(results);
        }
      }
    } else if (str.length === 0) {
      clearBusca();
    }
  }

  function clearBusca() {
    setBusca("");
    setResults([]);
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <TableContainer>
          <TableHeader>
            {condominiumsSelected ? <h3>Residentes de {condominiumsSelected.name}</h3> : null}
            <SearchInput>
              <FaSearch color="#737373" onClick={searchStringInArray} />
              <input
                value={busca}
                onChange={({ target }) => searchStringInArray(target.value)}
                type="text"
                placeholder="Pesquisar"
              />
              {busca && (
                <TiDeleteOutline color="#737373" onClick={clearBusca} />
              )}
            </SearchInput>
            <Button
              type="button"
              variant="contained"
              startIcon={<FiPlus />}
              onClick={handleAdd}
            >
              Adicionar
            </Button>
          </TableHeader>
          <Table
            data={results.length > 0 ? results : residents}
            apiRoute="residents"
          ></Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default CondominioResidents;
