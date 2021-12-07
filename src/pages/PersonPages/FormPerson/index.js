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
import { api } from "../../../services/api";
import ClearForm from "../../../utils/Functions/ClearForm";

const FormPerson = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const { id: userId } = useParams();

  React.useEffect(() => {
    if (userId) {
      try {
        api.get(`people/${userId}`).then((res) => {
          setValues({
            name: res.data.name,
            email: res.data.email,
            cell_phone: res.data.cell_phone,
            cpf: res.data.cpf,
            user_name: res.data.user_name,
            password: res.data.password,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const usuario = {
      name: values.name,
      email: values.email,
      cell_phone: values.cell_phone,
      cpf: values.cpf,
      user: {
        user_name: values.user_name,
        password: values.password,
      },
    };

    if (userId) {
      try {
        await api.put(`people/${userId}`, usuario);
        toast.success("Usuário cadastrado!");
        setValues(ClearForm(values));
        navigate("/usuarios");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("people", usuario);
        toast.success("Usuário cadastrado!");
        setValues(ClearForm(values));
        navigate("/usuarios");
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/usuarios");
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
                    value={values.name || ""}
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
                    value={values.email || ""}
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
                    value={values.user_name || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              {userId ? null : (
                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name="password"
                      label="Senha"
                      type="password"
                      onChange={handleChange}
                      value={values.password || ""}
                      fullWidth
                    />
                  </FormGroup>
                </Grid>
              )}

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

export default FormPerson;
