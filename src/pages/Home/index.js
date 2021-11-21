import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { Container, Content, FormHeader } from "./styles";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router";

const validate = (values) => {
  const errors = {}

  if (!values.user) {
    errors.user = "Campo obrigatório!";
  } else if (values.user.length < 4) {
    errors.user = "Must be 4 characters or less";
  }

  if (!values.password) {
    errors.password = "Campo obrigatório!";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or less";
  }

  return errors;
};

const Home = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      navigate("/dash")
    },
  });
  return (
    <Container>
      <Content onSubmit={formik.handleSubmit}>
        <FormHeader>
          <Logo />
          <p>Área Administrativa</p>
        </FormHeader>
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
        <div>
          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default Home;
