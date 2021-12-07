import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaEdit, FaSearch } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Container,
  Content,
  SearchInput,
  TableContainer,
  TableHeader,
} from "./styles";
import Header from "../../../components/Header";
import { api } from "../../../services/api";
import { formatPrice } from "../../../utils/Functions/formatPrice";
import { toast } from "react-toastify";

const SubscriptionList = () => {
  const [plans, setPlans] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    loadPlans();
  }, []);

  async function loadPlans() {
    try {
      const res = await api.get("subscription-plans");
      setPlans(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAdd() {
    navigate("adicionar");
  }

  function handleEdit(id) {
    navigate(`${id}/editar`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`subscription-plans/${id}`);
      toast.warning("Deletado!");

      const updatedData = [...plans];
      const itemIndex = updatedData.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        updatedData.splice(itemIndex, 1);
        setPlans(updatedData);
      } else {
        throw Error();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function ItemCard(item) {
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formatPrice(item.price)}
            </Typography>
            <Typography variant="body2">
              Horário limite manhã {item.deadline_orders_morning}
            </Typography>
            <Typography variant="body2">
              Horário limite tarde {item.deadline_orders_afternoon}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleEdit(item.id)}>
              <FaEdit title="Editar" className="btnEdit" />
            </IconButton>

            <IconButton onClick={() => handleDelete(item.id)}>
              <FiTrash title="Excluir" className="btnDelete" />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  function searchStringInArray(str) {
    setBusca(str);
    const resultsArray = [...results];
    if (str.length > 2) {
      for (var j = 0; j < plans.length; j++) {
        if (plans[j].name.toLowerCase().match(str.toLowerCase())) {
          resultsArray.push(plans[j]);
          setPlans(resultsArray);
        }
      }
    } else if (str.length === 0) {
      loadPlans();
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
            <h3>Planos</h3>
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

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {plans.length > 0 && results.length === 0
              ? plans.map((plan) => ItemCard(plan))
              : results.map((plan) => ItemCard(plan))}
          </Grid>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default SubscriptionList;
