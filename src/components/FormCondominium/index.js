import React from "react";
import { TextField, Button, Grid, Autocomplete } from "@material-ui/core";
import { Form, Title, FormGroup } from "./styles";
import CondominiumSchema from "../../utils/YupSchemas/CondominiumSchema";
import ErrorMessage from "../ErrorMessage";

const Condominio = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    bakery: {
      name: "",
      imgLogo: "",
      address: {
        street_name: "",
        number: 0,
        city: "",
        state: "",
        zip_code: "",
        complement: "",
      },
    },
    subscriptionPlan: {
      name: "",
      price: 0,
      deadline_orders_morning: 0,
      deadline_orders_afternoon: 0,
    },
    street_name: "",
    number: 0,
    city: "",
    state: "",
    zip_code: "",
    complement: "",
  });
  const [erros, setErros] = React.useState({});

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    const haveErros = Object.values(CondominiumSchema(values)).length;
    event.preventDefault();
    setErros(CondominiumSchema(values));
    if (haveErros === 0) console.log("Pera lá");
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Title>{props.label}</Title>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={8}>
            <FormGroup>
              <TextField
                name="name"
                label="Nome"
                type="text"
                onChange={handleChange}
                value={values.name}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <FormGroup>
              <TextField
                name="bakery"
                label="Padaria"
                type="text"
                onChange={handleChange}
                value={values.name}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={9}>
            <FormGroup>
              <TextField
                name="street_name"
                label="Rua"
                type="text"
                onChange={handleChange}
                value={values.street_name}
                fullWidth
              />
              {erros.street_name && (
                <ErrorMessage message={erros.street_name} />
              )}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <FormGroup>
              <TextField
                name="number"
                label="Número"
                type="number"
                onChange={handleChange}
                value={values.number}
                fullWidth
              />
              {erros.number && <ErrorMessage message={erros.number} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <FormGroup>
              <TextField
                name="city"
                label="Cidade"
                type="text"
                onChange={handleChange}
                value={values.city}
                fullWidth
              />
              {erros.city && <ErrorMessage message={erros.city} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <FormGroup>
              <TextField
                name="state"
                label="Estado"
                type="text"
                onChange={handleChange}
                value={values.state}
                fullWidth
              />
              {erros.state && <ErrorMessage message={erros.state} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <TextField
                name="zip_code"
                label="CEP"
                type="text"
                onChange={handleChange}
                value={values.zip_code}
                fullWidth
              />
              {erros.zip_code && <ErrorMessage message={erros.zip_code} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <TextField
                name="complement"
                label="Complemento"
                type="text"
                onChange={handleChange}
                value={values.complement}
                fullWidth
              />
              {erros.complement && <ErrorMessage message={erros.complement} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

export default Condominio;
