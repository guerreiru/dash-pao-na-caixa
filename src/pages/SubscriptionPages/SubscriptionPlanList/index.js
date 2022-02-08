import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  FormGroup,
  TextField,
  Modal,
  Box,
  Alert
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
  TableHeader
} from "./styles";
import { api } from "../../../services/api";
import { FormatPrice } from "../../../utils/Functions/FormatPrice";
import { toast } from "react-toastify";
import { getUserConfig } from "../../../utils/Functions/Auth";

const SubscriptionList = () => {
  const [plans, setPlans] = React.useState([]);
  const [planId, setPlanId] = React.useState("");
  const [role, setRole] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true)
    setPlanId(id)
  }
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (getUserConfig() !== undefined) {
      setRole(getUserConfig().roles[0]);
      loadPlans();
    } else {
      navigate("/")
    }
  }, [navigate]);

  async function loadPlans() {
    try {
      const res = await api.get("subscription-plans");
      const arrayPlans = []
      arrayPlans.push(res.data)
      setPlans(arrayPlans);
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
      const res = await api.post(`/subscriptions`, {
        subscriptionPlan_id: planId,
        recurrence: Number(recurrence)
      })
      window.open(res.data.init_point, '_blank');
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
            {role !== "ROLE_RESIDENT" ? (
              <>
                <IconButton onClick={() => handleEdit(item.id)}>
                  <FaEdit title="Editar" className="btnEdit" />
                </IconButton>

                <IconButton onClick={() => handleDelete(item.id)}>
                  <FiTrash title="Excluir" className="btnDelete" />
                </IconButton>
              </>
            ) : <Button
              type="button"
              variant="contained"
              onClick={() => handleOpen(item.id)}
              className="btnAddDesktop"
            >
              Assinar
            </Button>}

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
            {role !== "ROLE_RESIDENT" ? (
              <span>
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
              </span>
            ) : null}
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
      <ModalRecurrence />
    </Container>
  );
};

export default SubscriptionList;
