import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { Form, Title, InputImage, FormGroup } from "./styles";
import BakerySchema from "../../utils/YupSchemas/BakerySchema";
import ErrorMessage from "../ErrorMessage";
import { api } from "../../services/api";

const FormBakery = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    img_logo: " ",
    street_name: "",
    number: "",
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

  async function handleSubmit(event) {
    const haveErros = Object.values(BakerySchema(values)).length;
    event.preventDefault();
    setErros(BakerySchema(values));

    if (haveErros === 0) {
      console.log(values);
      const bakery = {
        name: values.name,
        imgLogo: "https://cdn-icons-png.flaticon.com/512/992/992747.png",
        address: { ...values },
      };
      try {
        const res = await api.post("bakery", bakery);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
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
            <InputImage>
              <input type="file" id="logo" />
              <label htmlFor="logo">Escolher arquivo</label>
            </InputImage>
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

export default FormBakery;
