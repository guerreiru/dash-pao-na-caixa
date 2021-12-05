import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Container, Content, FormHeader, FormGroup } from "./styles";
import Logo from "../../components/Logo";
// import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router";
// import UserSchema from "../../utils/Schemas/UserSchema";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    user_name: "",
    password: "",
  });
  // const [erros, setErros] = React.useState({});

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    // const haveErros = Object.values(UserSchema(values)).length;
    event.preventDefault();
    // setErros(UserSchema(values));
    navigate("/padarias");
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <FormHeader>
          <Logo />
          <p>Área Administrativa</p>
        </FormHeader>
        <FormGroup>
          <TextField
            name="user_name"
            label="Usuário"
            type="text"
            onChange={handleChange}
            value={values.user_name}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <TextField
            name="password"
            label="Senha"
            type="password"
            onChange={handleChange}
            value={values.password}
            fullWidth
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </Content>
    </Container>
  );
};

export default Login;
