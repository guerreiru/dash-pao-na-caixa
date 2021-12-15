import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { Container, Content } from "./styles";

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

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cell_phone: "",
      cpf: "",
      user: "",
      password: ""
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container>
      <Content onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          label="Nome"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          helperText={formik.errors.name}
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          helperText={formik.errors.email}
        />

        <TextField
          name="cell_phone"
          label="Telefone"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.cell_phone}
          error={formik.errors.cell_phone}
          helperText={formik.errors.cell_phone}
        />

        <TextField
          name="cpf"
          label="Cpf"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.errors.cpf}
          helperText={formik.errors.cpf}
        />

        <TextField
          name="user"
          label="Usuário"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.user}
          error={formik.errors.user}
          helperText={formik.errors.user}
        />

        <TextField
          name="password"
          label="Senha"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          helperText={formik.errors.password}
        />

        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </Content>
    </Container>
  );
};

export default Register;
