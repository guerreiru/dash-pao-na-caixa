import React from "react";
import { Container, Content, TableContainer } from "./styles";
import { api } from "../../services/api";
import { Button, FormGroup, Grid, TextField } from "@material-ui/core";
import HeadTitle from "../../components/HeadTitle";

const Profile = () => {
  const [values, setValues] = React.useState({
    name: "",
    cell_phone: "",
    email: "",
    apartment_number: "",
  });
  const [edit, setEdit] = React.useState(false)

  React.useEffect(() => {
    async function loadUserInfo() {
      const user = await api.get("users/profile");
      let apartment_number = ""

      if (user.data.person.resident) {
        apartment_number = user.data.person.resident.apartment_number
      }
      setValues({
        name: user.data.person.name,
        cell_phone: user.data.person.cell_phone,
        email: user.data.person.email,
        apartment_number: apartment_number,
      });
    }
    loadUserInfo();
  }, []);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
  }

  return (
    <Container>
      <HeadTitle
        title="Pão na caixa | Perfil"
        description="Perfil do usuário!"
      />
      <Content>
        <TableContainer>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{marginBottom: "10px"}}>
                <h3>Dados do usuário</h3>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="name"
                    label="Nome"
                    type="text"
                    onChange={handleChange}
                    value={values.name || ""}
                    fullWidth
                    disabled={!edit}
                    required
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
                    value={values.cell_phone || ""}
                    fullWidth
                    disabled={!edit}
                    required
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
                    disabled={!edit}
                    required
                  />
                </FormGroup>
              </Grid>

              {values.apartment_number !== "" ? (
                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name="apartment_number"
                      label="Apartamento"
                      type="text"
                      onChange={handleChange}
                      value={values.apartment_number || ""}
                      fullWidth
                      disabled
                      required
                    />
                  </FormGroup>
                </Grid>
              ) : null}

              {edit ? (
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginRight: "5px" }}
                  >
                    Gravar
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => setEdit(false)}>
                    Cancelar
                  </Button>
                </Grid>) : (
                <Grid item xs={12} >
                  <Button
                    variant="contained"
                    style={{ marginRight: "5px" }}
                    onClick={() => setEdit(true)}
                  >
                    Editar
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Profile;
