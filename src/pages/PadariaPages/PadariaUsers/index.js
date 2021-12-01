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
import { BakeryContext } from "../../../context/BakeryContext";
import ObjVal from "../../../utils/Functions/ObjecValue";

const Padaria = () => {
  const [users, setUsers] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();
  const { bakeries } = React.useContext(BakeryContext);
  const [bakerySelected, setBakerySelected] = React.useState("");
  const { id: bakeryId } = useParams();

  React.useEffect(() => {
    loadUsers();
  }, []);

  React.useEffect(() => {
    setBakeryData();
  }, [bakeries]);

  async function loadUsers() {
    try {
      const res = await api.get("users");
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function setBakeryData() {
    const bakary = ObjVal(bakeries).filter(
      (bakary) => bakary.id === Number(bakeryId)
    );
    setBakerySelected(bakary);
  }

  function handleAdd() {
    navigate("adicionar");
  }

  function searchStringInArray(str) {
    setBusca(str);
    const results = [];
    if (str.length > 2) {
      for (var j = 0; j < users.length; j++) {
        if (users[j].user_name.toLowerCase().match(str.toLowerCase())) {
          results.push(users[j]);
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
            {bakerySelected ? (
              <h3>Usuários de {bakerySelected[0].name}</h3>
            ) : null}
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
            data={results.length > 0 ? results : users}
            apiRoute="users"
          ></Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Padaria;
