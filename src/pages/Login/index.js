import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Container, Content, FormHeader, FormGroup } from "./styles";
import { toast } from "react-toastify";
import HeadTitle from "../../components/HeadTitle"
import { makeLogin } from "../../utils/Functions/Auth";
import logoImage from "../../assets/logo.svg";

const Login = () => {
  const [values, setValues] = React.useState({
    user_name: "",
    password: "",
    showPassword: false,
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <HeadTitle
        title="Pão na caixa | Login"
        description="Login da aplicação!"
      />
      <Content onSubmit={handleSubmit}>
        <FormHeader>
          <img src={logoImage} alt="Logo pão na caixa" width="100" />
          {/* <p>Área Administrativa</p> */}
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

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            autoComplete="on"
            name="password"
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>

        <Button style={{ marginTop: "10px" }} type="submit" variant="contained">
          Entrar
        </Button>
      </Content>
    </Container>
  );
};

export default Login;
