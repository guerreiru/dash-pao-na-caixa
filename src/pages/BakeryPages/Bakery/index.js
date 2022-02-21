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
import HeadTitle from "../../../components/HeadTitle";
import Table from "../../../components/Table";
import { api } from "../../../services/api";

const Bakery = () => {
  const [bakeries, setBakeries] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    api.get("bakeries").then((res) => {
      if (mounted) {
        setBakeries(res.data.data);
        setloading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

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
      clearBusca();
    }
  }

  function clearBusca() {
    setBusca("");
    setResults([]);
  }
  return (
    <Container>
      <HeadTitle
        title="Pão na caixa | Padarias"
        description="Padarias cadastradas"
      />
      <Content>
        {loading ? <p>Carregando...</p> : (
          <TableContainer>
            <TableHeader>
              <h3>Padarias</h3>
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
              data={results.length > 0 ? results : bakeries}
              apiRoute="bakeries"
              userType="bakery"
            ></Table>
          </TableContainer>
        )}
      </Content>
    </Container>
  );
};

export default Bakery;
