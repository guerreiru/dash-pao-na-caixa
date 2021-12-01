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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
  FormGroup,
} from "./styles";
import Header from "../../../components/Header";
import ErrorMessage from "../../../components/ErrorMessage";
import { BakeryContext } from "../../../context/BakeryContext";
import { SubscriptionContext } from "../../../context/SubscriptionContext";
import CondominiumSchema from "../../../utils/Schemas/CondominiumSchema";
import ClearForm from "../../../utils/Functions/ClearForm";
import ObjVal from "../../../utils/Functions/ObjecValue";

const Condominio = () => {
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
  const [erros, setErros] = React.useState({});
  const { bakeries, bakeryOptions } = React.useContext(BakeryContext);
  const [bakeryItems, setBakeryOptions] = React.useState("");

  const { subscriptions, subscriptionOptions } =
    React.useContext(SubscriptionContext);
  const [subscriptionsItems, setSubscriptionsOptions] = React.useState("");

  const navigate = useNavigate();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleBlur() {
    setErros(CondominiumSchema(values));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bakery = ObjVal(bakeries).find(
      (bakeries) => bakeries.id === bakeryItems
    );

    const subscriptionPlan = ObjVal(subscriptions).find(
      (subscription) => subscription.id === subscriptionsItems
    );
    const haveErros = ObjVal(CondominiumSchema(values)).length;
    setErros(CondominiumSchema(values));
    if (haveErros === 0) {
      try {
        api.post("condominiums", {
          ...values,
          bakery,
          subscriptionPlan,
        });
        setBakeryOptions("");
        toast.success("Condomínio cadastrado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      } catch (error) {}
    }
  }

  const handleSelectBakery = ({ target }) => {
    setBakeryOptions(target.value);
  };

  const handleSelectPlan = ({ target }) => {
    setSubscriptionsOptions(target.value);
  };

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/condominios");
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Condomínio</h3>
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
                    onBlur={handleBlur}
                    value={values.name}
                    fullWidth
                  />
                  {erros.name && <ErrorMessage message={erros.name} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="padarias">Padaria</InputLabel>
                  <Select
                    id="padarias"
                    value={bakeryItems}
                    onChange={handleSelectBakery}
                    fullWidth
                    label="Padaria"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {ObjVal(bakeryOptions()).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
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
                    value={subscriptionsItems}
                    onChange={handleSelectPlan}
                    fullWidth
                    label="Planos"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {ObjVal(subscriptionOptions()).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
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
                    onBlur={handleBlur}
                    value={values.street_name}
                    fullWidth
                  />
                  {erros.street_name && (
                    <ErrorMessage message={erros.street_name} />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="number"
                    label="Número"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    fullWidth
                  />
                  {erros.number && <ErrorMessage message={erros.number} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="city"
                    label="Cidade"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    fullWidth
                  />
                  {erros.city && <ErrorMessage message={erros.city} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="state"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    fullWidth
                  />
                  {erros.state && <ErrorMessage message={erros.state} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="zip_code"
                    label="CEP"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip_code}
                    fullWidth
                  />
                  {erros.zip_code && <ErrorMessage message={erros.zip_code} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="complement"
                    label="Complemento"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.complement}
                    fullWidth
                  />
                  {erros.complement && (
                    <ErrorMessage message={erros.complement} />
                  )}
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                >
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

export default Condominio;
