import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { Form, Title, InputImage, FormGroup } from "./styles";
import CondominiumSchema from "../../utils/YupSchemas/CondominiumSchema";
import ErrorMessage from "../ErrorMessage";

const Condominio = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    user: "",
    password: "",
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
                value={values.user}
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

          <Grid item xs={12} sm={4} md={3}>
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

export default Condominio;
