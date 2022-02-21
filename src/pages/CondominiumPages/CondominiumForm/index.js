import React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
  FormGroup,
} from "./styles";

import ClearForm from "../../../utils/Functions/ClearForm";

const CondominiumForm = () => {
  const [values, setValues] = React.useState({
    name: "",
    plan_name: "",
    plan_price: 0,
    plan_deadline_orders_morning: 0,
    plan_deadline_orders_afternoon: 0,
    street_name: "",
    number: "",
    city: "",
    state: "",
    zip_code: "",
    complement: "",
  });
  const [bakeries, setBakeries] = React.useState([]);
  const [bakerySelected, setBakerySelected] = React.useState("");

  const [subscriptions, setSubscriptions] = React.useState([]);
  const [subscriptionSelected, setSubscriptionSelected] = React.useState("");

  const [title, setTitle] = React.useState("");

  const navigate = useNavigate();
  const { id: condominiumId } = useParams();

  async function getDataSelect(url) {
    try {
      const res = await api.get(url);
      return res;
    } catch (error) {
      return error;
    }
  }

  React.useEffect(() => {
    getDataSelect("bakeries").then((res) => setBakeries(res.data.data));
    getDataSelect("subscription-plans").then((res) =>
      setSubscriptions(res.data.data)
    );
  }, []);

  React.useEffect(() => {
    if (condominiumId) {
      try {
        api.get(`condominiums/${condominiumId}`).then((res) => {
          setValues({
            name: res.data.name,
            street_name: res.data.address.street_name,
            number: res.data.address.number,
            city: res.data.address.city,
            state: res.data.address.state,
            zip_code: res.data.address.zip_code,
            complement: res.data.address.complement,
          });
          setTitle(res.data.name);
          if (res.data.bakery) {
            setBakerySelected(res.data.bakery.id);
          } else {
            setBakerySelected("");
          }
          if (res.data.subscriptionPlan) {
            setSubscriptionSelected(res.data.subscriptionPlan.id);
          } else {
            setSubscriptionSelected("");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [condominiumId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const condominium = {
      name: values.name,
      address: {
        street_name: values.street_name,
        number: Number(values.number),
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        complement: values.complement,
      },
      bakery: bakerySelected,
      subscriptionPlan: subscriptionSelected
    };

    if (condominiumId) {
      try {
        api.put(`condominiums/${condominiumId}`, condominium);
        setBakerySelected("");
        toast.success("Condomínio editado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      } catch (error) { }
    } else {
      try {
        api.post("condominiums", condominium);
        setBakerySelected("");
        toast.success("Condomínio cadastrado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      } catch (error) { }
    }
  }

  const handleSelectBakery = ({ target }) => {
    setBakerySelected(target.value);
  };

  const handleSelectPlan = ({ target }) => {
    setSubscriptionSelected(target.value);
  };

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/condominios");
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>
              {condominiumId ? `Editar ${title}` : "Adicionar Condomínio"}
            </h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="name"
                    label="Nome"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="padarias">Padaria</InputLabel>
                  <Select
                    id="padarias"
                    value={bakerySelected}
                    onChange={handleSelectBakery}
                    fullWidth
                    label="Padaria"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {bakeries.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="subscription-plans">Planos</InputLabel>
                  <Select
                    id="subscription-plans"
                    value={subscriptionSelected}
                    onChange={handleSelectPlan}
                    fullWidth
                    label="Planos"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {subscriptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="street_name"
                    label="Rua"
                    type="text"
                    onChange={handleChange}
                    value={values.street_name}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="number"
                    label="Número"
                    type="number"
                    onChange={handleChange}
                    value={values.number}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="city"
                    label="Cidade"
                    type="text"
                    onChange={handleChange}
                    value={values.city}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="state"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    value={values.state}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="zip_code"
                    label="CEP"
                    type="text"
                    onChange={handleChange}
                    value={values.zip_code}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="complement"
                    label="Complemento"
                    type="text"
                    onChange={handleChange}
                    value={values.complement}
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
                  Gravar
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default CondominiumForm;
