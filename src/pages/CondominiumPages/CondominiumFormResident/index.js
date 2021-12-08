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
import ClearForm from "../../../utils/Functions/ClearForm";

const CondominiumFormResident = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    apartment_number: "",
    user_name: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id: condominiumId } = useParams();
  const [condominium, setCondominium] = React.useState(null);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  React.useEffect(() => {
    async function getCondominium() {
      try {
        const res = await api.get(`condominiums/${condominiumId}`);
        setCondominium(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getCondominium();
  }, [condominiumId]);

  function handleSubmit(event) {
    event.preventDefault();
    const resident = {
      ...values,
      condominium: Number(condominiumId)
    }
    try {
      api.post("residents", resident).then((res) => {
        toast.success("Residente cadastrado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      });
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
            {condominium ? (
              <h3>Adicionar residente a {condominium.name}</h3>
            ) : null}
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

export default CondominiumFormResident;
