import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  FormGroup,
  TextField,
  Modal,
  Box,
  Alert
} from "@material-ui/core";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Container,
  Content,
  SearchInput,
  TableContainer,
  TableHeader
} from "./styles";
import { api } from "../../../services/api";
import { FormatPrice } from "../../../utils/Functions/FormatPrice";
import { toast } from "react-toastify";

const SubscriptionList = () => {
  const [plans, setPlans] = React.useState([]);
  const [planId, setPlanId] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  const handleOpen = (id) => {
    setOpen(true)
    setPlanId(id)
  }
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    let mounted = true;
    api.get("subscription-plans").then((res) => {
      if (mounted) {
        setPlans([res.data]);
        setLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  async function loadPlans() {
    try {
      const res = await api.get("subscription-plans");
      setPlans([res.data]);
      return res
    } catch (error) {
      console.error(error);
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    p: 4,
  };

  function ModalRecurrence() {
    const [recurrence, setRecurrence] = React.useState("")

    function handleRecurrence(e) {
      setRecurrence(e.target.value)
    }

    async function signPlan(e) {
      e.preventDefault()
      if (Number(recurrence) > 0) {
        const res = await api.post(`/subscriptions`, {
          subscriptionPlan_id: planId,
          recurrence: Number(recurrence)
        })
        window.open(res.data.init_point, '_blank');
      } else {
        toast.error("Insira um mês válido")
      }
    }

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={signPlan}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>

                <Alert severity="warning">
                  Atenção! Você será redirecionado para uma nova aba do Mercado Pago para concluir
                  a sua assinatura.
                </Alert>
                <h4 style={{ marginTop: "8px" }} >
                  Informe o número de meses da assinatura
                </h4>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <TextField
                    label="Número de meses"
                    type="tel"
                    onChange={handleRecurrence}
                    value={recurrence}
                    fullWidth
                    required
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: "5px" }}
                >
                  Confirmar
                </Button>
                <Button onClick={handleClose} variant="outlined" color="error" >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    );
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
              {FormatPrice(item.price)}
            </Typography>
            <Typography variant="body2">
              Horário limite manhã {item.deadline_orders_morning}
            </Typography>
            <Typography variant="body2">
              Horário limite tarde {item.deadline_orders_afternoon}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              onClick={() => handleOpen(item.id)}
              className="btnAddDesktop"
            >
              Assinar
            </Button>
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
          </TableHeader>

          {loading ? <p>Carregando...</p> : (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {plans && results.length === 0
                ? plans.map((plan) => ItemCard(plan))
                : results.map((plan) => ItemCard(plan))}
            </Grid>
          )}
        </TableContainer>
      </Content>
      <ModalRecurrence />
    </Container>
  );
};

export default SubscriptionList;
