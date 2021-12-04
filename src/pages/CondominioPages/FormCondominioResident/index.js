import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
  FormGroup,
} from "./styles";
import Header from "../../../components/Header";
// import ErrorMessage from "../../../components/ErrorMessage";
// import UserSchema from "../../../utils/Schemas/UserSchema";
import ClearForm from "../../../utils/Functions/ClearForm";
// import ObjVal from "../../../utils/Functions/ObjecValue";

const Residente = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    apartment_number: "",
    user_name: "",
    password: "",
  });
  // const [erros, setErros] = React.useState({});

  const navigate = useNavigate();
  const { id: condominium } = useParams();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  // function handleBlur() {
  //   setErros(UserSchema(values));
  // }

  function handleSubmit(event) {
    event.preventDefault();
    // const haveErros = ObjVal(UserSchema(values)).length;
    // setErros(UserSchema(values));
    try {
      api.post("residents", {
        ...values,
        condominium,
      });
      toast.success("Residente cadastrado!");
      setValues(ClearForm(values));
      navigate("/condominios");
    } catch (error) {}
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/condominios");
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Residente</h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="name"
                    label="Nome"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="cell_phone"
                    label="Telefone"
                    type="tel"
                    onChange={handleChange}
                    value={values.cell_phone}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="cpf"
                    label="CPF"
                    type="tel"
                    onChange={handleChange}
                    value={values.cpf}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="apartment_number"
                    label="Apartamento"
                    type="tel"
                    onChange={handleChange}
                    value={values.apartment_number}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
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
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
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
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: "5px" }}
                >
                  Gravar
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default Residente;
