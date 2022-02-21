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
import HeadTitle from "../../../components/HeadTitle";
import { api } from "../../../services/api";
import { IoPersonAdd } from "react-icons/io5";
import { getUserConfig } from "../../../utils/Functions/Auth";

const BakeryUsers = (props) => {
  const [users, setUsers] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [busca, setBusca] = React.useState("");
  const [bakerySelected, setBakerySelected] = React.useState([]);
  const { id: bakeryId } = useParams();
  const navigate = useNavigate();


  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (getUserConfig().roles[0] === "ROLE_BAKERY") {
        api.get(`bakeries/${getUserConfig().bakery.id}/people`).then((res) => {
          if (mounted) {
            setUsers(res.data);
            setloading(false)
          }
        });
      } else {
        api.get(`bakeries/${bakeryId}/people`).then((res) => {
          if (mounted) {
            setUsers(res.data);
            setloading(false)
          }
        });
      }
    }
    return function cleanup() {
      mounted = false;
    };

  }, [props.bakeryId, bakeryId]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (getUserConfig().roles[0] === "ROLE_BAKERY") {
        api.get(`bakeries/${getUserConfig().bakery.id}`).then((res) => {
          if (mounted) {
            setBakerySelected(res.data);
            setloading(false)
          }
        });
      } else {
        api.get(`bakeries/${bakeryId}`).then((res) => {
          if (mounted) {
            setBakerySelected(res.data);
            setloading(false)
          }
        });
      }
    }
    return function cleanup() {
      mounted = false;
    };

  }, [props.bakeryId, bakeryId]);

  function handleAdd() {
    navigate(`/padarias/${bakeryId}/usuarios/adicionar`);
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
        <HeadTitle
          title={bakerySelected ? `Pão na caixa | ${bakerySelected.name}` : null}
          description="Padarias cadastradas"
        />
        <TableContainer>
          {loading ? <p>Carregando...</p> : (
            <>
              <TableHeader>
                {bakerySelected ? <h3>Usuários de {bakerySelected.name}</h3> : ""}
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
                data={results.length > 0 ? results : users}
                apiRoute="users"
                urlRoute="padarias"
                userType="bakeryUser"
              ></Table>
            </>
          )}
        </TableContainer>
      </Content>
    </Container>
  );
};

export default BakeryUsers;
