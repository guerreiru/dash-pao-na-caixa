import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
  FormGroup,
} from "./styles";
import Header from "../../../components/Header";
// import ErrorMessage from "../../../components/ErrorMessage";
import { api } from "../../../services/api";
// import UserSchema from "../../../utils/Schemas/UserSchema";
import ClearForm from "../../../utils/Functions/ClearForm";
// import ObjVal from "../../../utils/Functions/ObjecValue";

const FormPadaria = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    user_name: "",
    password: "",
  });
  // const [erros, setErros] = React.useState({});
  const navigate = useNavigate();
  const { id: bakeryId } = useParams();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  // function handleBlur() {
  //   setErros(UserSchema(values));
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    // const haveErros = ObjVal(UserSchema(values)).length;
    // setErros(UserSchema(values));

    try {
      await api.post(`bakeries/${bakeryId}/people`, values);
      toast.success("Usuario cadastrado!");
      setValues(ClearForm(values));
      navigate("/padarias");
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/padarias");
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Usuário</h3>
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
                    // onBlur={handleBlur}
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
                    // onBlur={handleBlur}
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
                    // onBlur={handleBlur}
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
                    // onBlur={handleBlur}
                    value={values.cpf}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="user_name"
                    label="Usuário"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.user_name}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="password"
                    label="Senha"
                    type="password"
                    onChange={handleChange}
                    // onBlur={handleBlur}
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

export default FormPadaria;
