import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
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
import Header from "../../../components/Header";
import { api } from "../../../services/api";
import { formatPrice } from "../../../utils/Functions/formatPrice";

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

  function searchStringInArray(str) {
    setBusca(str);
    const results = [];
    const plansBackup = [...plans];
    if (str.length > 2) {
      for (var j = 0; j < plans.length; j++) {
        if (plans[j].name.toLowerCase().match(str.toLowerCase())) {
          results.push(plans[j]);
          setPlans(results);
        }
      }
    } else if (str.length === 0) {
      loadPlans()
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
            {plans.length > 0
              ? plans.map((plan) => (
                  <Grid item xs={12} sm={6} md={4} key={plan.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {plan.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {formatPrice(plan.price)}
                        </Typography>
                        <Typography variant="body2">
                          Horário limite manhã {plan.deadline_orders_morning}
                        </Typography>
                        <Typography variant="body2">
                          Horário limite tarde {plan.deadline_orders_afternoon}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default SubscriptionList;
