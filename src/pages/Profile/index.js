import React from "react";
import { Container, Content, TableContainer } from "./styles";
import { api } from "../../services/api";
import { FormGroup, Grid, TextField } from "@material-ui/core";

const Profile = () => {
  const [values, setValues] = React.useState({
    name: "",
    cell_phone: "",
    email: "",
    apartment_number: "",
  });

  React.useEffect(() => {
    async function loadUserInfo() {
      const user = await api.get("users/profile");
      console.log(user);
      setValues({
        name: user.data.person.name,
        cell_phone: user.data.person.cell_phone,
        email: user.data.person.email,
        apartment_number: user.data.person.resident.apartment_number,
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

  return (
    <Container>
      <Content>
        <TableContainer>
          <form>
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
                    name="cell_phone"
                    label="Telefone"
                    type="tel"
                    onChange={handleChange}
                    value={values.cell_phone || ""}
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
                    name="apartment_number"
                    label="Apartamento"
                    type="text"
                    onChange={handleChange}
                    value={values.apartment_number || ""}
                    fullWidth
                    disabled
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </form>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Profile;
