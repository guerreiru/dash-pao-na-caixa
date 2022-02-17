import React from "react";
import { Button } from "@material-ui/core";
import jwtDecode from "jwt-decode";
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

import { api } from "../../../services/api";
import { IoPersonAdd } from "react-icons/io5";

const BakeryUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const [bakerySelected, setBakerySelected] = React.useState([]);
  const { id: bakeryId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadUsers() {
      const user = localStorage.getItem("authData");
      if (user) {
        const userParsed = JSON.parse(user);
        const userDecoded = jwtDecode(userParsed.access_token);
        return userDecoded;
      }

      try {
        const res = await api.get(`bakeries/${bakeryId}/people`);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadUsers();
  }, [bakeryId]);

  React.useEffect(() => {
    async function loadBakeryInfo() {
      try {
        const res = await api.get(`bakeries/${bakeryId}`);
        setBakerySelected(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadBakeryInfo();
  }, [bakeryId]);

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
      <Content>
        <TableContainer>
          <TableHeader>
            {bakerySelected ? <h3>Usuários de {bakerySelected.name}</h3> : null}
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
            noEditable={true}
            data={results.length > 0 ? results : users}
            apiRoute="users"
          ></Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default BakeryUsers;
