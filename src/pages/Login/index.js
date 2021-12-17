import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Container, Content, FormHeader, FormGroup } from "./styles";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
import { makeLogin } from "../../utils/Functions/Auth";

const Login = () => {
  const [values, setValues] = React.useState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const user_name = values.user_name;
    const password = values.password;

    makeLogin(user_name, password)
      .then((res) => {
        navigate("/dash");
      })
      .catch((err) => {
        toast.error("Usuário ou senha incorretos!");
      });
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
            required
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
            required
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
