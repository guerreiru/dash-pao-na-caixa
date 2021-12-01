import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
  FormGroup,
  InputImage,
} from "./styles";
import Header from "../../../components/Header";
import ErrorMessage from "../../../components/ErrorMessage";
import { api } from "../../../services/api";
import BakerySchema from "../../../utils/Schemas/BakerySchema";
import ClearForm from "../../../utils/Functions/ClearForm";
import ObjVal from "../../../utils/Functions/ObjecValue";

const FormPadaria = () => {
  const [values, setValues] = React.useState({
    name: "",
    img_logo: " ",
    street_name: "",
    number: "",
    city: "",
    state: "",
    zip_code: "",
    complement: "",
  });
  const [erros, setErros] = React.useState({});
  const navigate = useNavigate();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleBlur() {
    setErros(BakerySchema(values));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const haveErros = ObjVal(BakerySchema(values)).length;
    setErros(BakerySchema(values));

    if (haveErros === 0) {
      const bakeries = {
        name: values.name,
        imgLogo: "https://cdn-icons-png.flaticon.com/512/992/992747.png",
        address: { ...values },
      };
      try {
        await api.post("bakeries", bakeries);
        toast.success("Padaria cadastrada!");
        setValues(ClearForm(values));
        navigate("/padarias");
      } catch (error) {
        console.error(error);
      }
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
            <h3>Adicionar Padaria</h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={4} md={8}>
                <FormGroup>
                  <TextField
                    name="name"
                    label="Nome"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    fullWidth
                  />
                  {erros.name && <ErrorMessage message={erros.name} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <InputImage>
                  <input type="file" id="logo" />
                  <label htmlFor="logo">Escolher arquivo</label>
                </InputImage>
              </Grid>

              <Grid item xs={12} sm={4} md={9}>
                <FormGroup>
                  <TextField
                    name="street_name"
                    label="Rua"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street_name}
                    fullWidth
                  />
                  {erros.street_name && (
                    <ErrorMessage message={erros.street_name} />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="number"
                    label="Número"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    fullWidth
                  />
                  {erros.number && <ErrorMessage message={erros.number} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="city"
                    label="Cidade"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    fullWidth
                  />
                  {erros.city && <ErrorMessage message={erros.city} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="state"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    fullWidth
                  />
                  {erros.state && <ErrorMessage message={erros.state} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <FormGroup>
                  <TextField
                    name="zip_code"
                    label="CEP"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip_code}
                    fullWidth
                  />
                  {erros.zip_code && <ErrorMessage message={erros.zip_code} />}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <FormGroup>
                  <TextField
                    name="complement"
                    label="Complemento"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.complement}
                    fullWidth
                  />
                  {erros.complement && (
                    <ErrorMessage message={erros.complement} />
                  )}
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                >
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
