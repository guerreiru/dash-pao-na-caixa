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

import { api } from "../../../services/api";
import ClearForm from "../../../utils/Functions/ClearForm";

const BakeryFormUser = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    cell_phone: "",
    cpf: "",
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();
  const { id: bakeryId } = useParams();
  const [bakery, setBakery] = React.useState(null);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  React.useEffect(() => {
    async function getBakery() {
      try {
        const res = await api.get(`bakeries/${bakeryId}`);
        setBakery(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getBakery();
  }, [bakeryId]);

  async function handleSubmit(event) {
    event.preventDefault();

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
      <Content>
        <FormContainer>
          <FormHeader>
            {bakery ? <h3>Adicionar usuário a {bakery.name}</h3> : null}
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={4} md={4}>
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

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="cpf"
                    label="CPF"
                    type="text"
                    onChange={handleChange}
                    value={values.cpf}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
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
                    name="user_name"
                    label="Usuário"
                    type="text"
                    onChange={handleChange}
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

export default BakeryFormUser;
