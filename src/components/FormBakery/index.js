import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { Form, Title, InputImage, FormGroup } from "./styles";
import BakerySchema from "../../utils/YupSchemas/BakerySchema";
import ErrorMessage from "../ErrorMessage";

const FormBakery = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    img_logo: "",
    street_name: "",
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
    const haveErros = Object.values(BakerySchema(values)).length;
    event.preventDefault();
    setErros(BakerySchema(values));
    if (haveErros === 0) console.log("Pera lá")
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
              {erros.street_name && <ErrorMessage message={erros.street_name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
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
                name="name"
                label="Nome"
                type="text"
                onChange={handleChange}
                value={values.user}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <FormGroup>
              <TextField
                name="name"
                label="Nome"
                type="text"
                onChange={handleChange}
                value={values.user}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <TextField
                name="name"
                label="Nome"
                type="text"
                onChange={handleChange}
                value={values.user}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormGroup>
              <TextField
                name="name"
                label="Nome"
                type="text"
                onChange={handleChange}
                value={values.user}
                fullWidth
              />
              {erros.name && <ErrorMessage message={erros.name} />}
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
