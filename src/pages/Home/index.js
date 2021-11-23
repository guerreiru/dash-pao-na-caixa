import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Container, Content, FormHeader, FormGroup } from "./styles";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router";
import UserSchema from "../../utils/YupSchemas/UserSchema";

const Home = () => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
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
    const haveErros = Object.values(UserSchema(values)).length;
    event.preventDefault();
    setErros(UserSchema(values));
    if (haveErros === 0) navigate("/dash")
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
            name="user"
            label="Usuário"
            type="text"
            onChange={handleChange}
            value={values.user}
            fullWidth
          />
          {erros.user && <ErrorMessage message={erros.user} />}
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
          {erros.password && <ErrorMessage message={erros.password} />}
        </FormGroup>
        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </Content>
    </Container>
  );
};

export default Home;
