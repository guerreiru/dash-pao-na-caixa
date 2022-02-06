import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
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

import { api } from "../../../services/api";

const Person = () => {
  const [people, setPeople] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadUsers(route) {
      api.get(route).then(res => {
        setPeople(res.data);
        console.log(res.data);
      })
    }

    const user = localStorage.getItem("authData");
    if (user) {
      const userParsed = JSON.parse(user);
      const userDecoded = jwtDecode(userParsed.access_token);
      const role = userDecoded.user.roles

      switch (role[0]) {
        case "ROLE_BAKERY":
          loadUsers(`bakeries/${userDecoded.user.bakery.id}/people`);
          break;
        case "ROLE_CONDOMINIUM":
          loadUsers(`condominiums/${userDecoded.user.condominium.id}/people`);
          break;
        default:
          break;
      }
    }
  }, []);


  function handleAdd() {
    navigate("adicionar");
  }

  function searchStringInArray(str) {
    setBusca(str);
    const results = [];
    if (str.length > 2) {
      for (var j = 0; j < people.length; j++) {
        if (people[j].person_name.toLowerCase().match(str.toLowerCase())) {
          results.push(people[j]);
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
            <h3>Usuários</h3>
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
            data={results.length > 0 ? results : people}
            apiRoute="people"
          ></Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Person;
