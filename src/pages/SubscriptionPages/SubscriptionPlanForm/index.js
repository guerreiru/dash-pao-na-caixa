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
} from "./styles";
import Header from "../../../components/Header";
import { api } from "../../../services/api";
import ClearForm from "../../../utils/Functions/ClearForm";

const SubscriptionPlanForm = () => {
  const [values, setValues] = React.useState({
    name: "",
    price: "",
    deadline_orders_morning: "",
    deadline_orders_afternoon: "",
  });
  const navigate = useNavigate();

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post("subscription-plans", {
        ...values,
        price: Number(values.price),
      });
      toast.success("Plano cadastrado!");
      setValues(ClearForm(values));
      navigate("/planos");
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/planos");
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Plano</h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={4} md={3}>
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

              <Grid item xs={12} sm={4} md={3}>
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

              <Grid item xs={12} sm={4} md={3}>
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

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="deadline_orders_afternoon"
                    label="Horário limite manhã"
                    type="time"
                    onChange={handleChange}
                    value={values.deadline_orders_afternoon}
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

export default SubscriptionPlanForm;
