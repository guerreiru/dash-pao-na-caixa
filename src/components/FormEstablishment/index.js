import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid } from "@material-ui/core";
import { Form, Title, InputImage } from "./styles";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Must be 4 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.cell_phone) {
    errors.cell_phone = "Required";
  } else if (values.cell_phone.length < 11) {
    errors.cell_phone = "Must be 11 characters or less";
  }

  if (!values.cpf) {
    errors.cpf = "Required";
  } else if (values.cpf.length < 11) {
    errors.cpf = "Must be 11 characters or less";
  }

  if (!values.user) {
    errors.user = "Required";
  } else if (values.user.length < 4) {
    errors.user = "Must be 4 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or less";
  }

  return errors;
};

const FormEstablishment = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cell_phone: "",
      cpf: "",
      user: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Grid container>
      <Grid item xs={12}>
        <Title>{props.label}</Title>
      </Grid>
      <Form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={8}>
            <TextField
              name="name"
              label="Nome"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
              helperText={"Nome da padaria" || formik.errors.name}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <InputImage>
              <input type="file" for="logo" id="logo" />
              <label htmlFor="logo">Escolher arquivo</label>
            </InputImage>
          </Grid>

          <Grid item xs={12} sm={4} md={9}>
            <TextField
              name="cell_phone"
              label="Telefone"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.cell_phone}
              error={formik.errors.cell_phone}
              helperText={"Nome da padaria" || formik.errors.cell_phone}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <TextField
              name="cpf"
              label="Cpf"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.cpf}
              error={formik.errors.cpf}
              helperText={"Nome da padaria" || formik.errors.cpf}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <TextField
              name="user"
              label="Usuário"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.user}
              error={formik.errors.user}
              helperText={"Nome da padaria" || formik.errors.user}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <TextField
              name="password"
              label="Senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={"Nome da padaria" || formik.errors.password}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField
              name="password"
              label="Senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={"Nome da padaria" || formik.errors.password}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField
              name="password"
              label="Senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={"Nome da padaria" || formik.errors.password}
              fullWidth
            />
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

export default FormEstablishment;
