import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
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

const Condominio = () => {
  const [condominiums, setCondominiums] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();

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
            <h3>Condomínios</h3>
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
              className="btnAddDesktop"
            >
              Adicionar
            </Button>

            <IoPersonAdd
              title="Adicionar"
              size="34"
              className="btnAddMobile"
              onClick={handleAdd}
            />
          </TableHeader>
          <Table
            data={results.length > 0 ? results : condominiums}
            apiRoute="condominiums"
          ></Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Condominio;
