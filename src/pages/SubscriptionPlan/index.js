import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Form, Title, FormGroup, Container, Content } from "./styles";
import Header from "../../components/Header";
import ClearForm from "../../utils/Functions/ClearForm";
import { Link } from "react-router-dom";

const Condominio = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    price: "",
    deadline_orders_morning: "",
    deadline_orders_afternoon: "",
    duedate: "",
  });

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(values);
    return;
    try {
      api.post("subscription-plans", {
        ...values,
      });
      toast.success("Plano cadastrado!");
      setValues(ClearForm(values));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Header loc="/dash">
        <Link to="/dash/padarias">Padaria</Link>
        <Link to="/dash/condominios">Condomínio</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/assinaturas">Assinatura</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/relatorios">Relatórios</Link>
        <Link to="/">Usuário</Link>
      </Header>
      <Content>
        <Grid container>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Title>Planos</Title>
              </Grid>
              <Grid item xs={12} sm={4} md={8}>
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
                    name="price"
                    label="Preço"
                    type="number"
                    onChange={handleChange}
                    value={values.price}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="deadline_orders_morning"
                    label="Horário limite manhã"
                    type="time"
                    onChange={handleChange}
                    value={values.deadline_orders_morning}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="deadline_orders_afternoon"
                    label="Horário limite tarde"
                    type="time"
                    onChange={handleChange}
                    value={values.deadline_orders_afternoon}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="duedate"
                    label="Dia de pagamento"
                    type="number"
                    onChange={handleChange}
                    value={values.duedate}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Grid>
      </Content>
    </Container>
  );
};

export default Condominio;

