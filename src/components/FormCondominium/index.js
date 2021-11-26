import React from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { ObjVal } from "../../utils/Functions/ObjecValue";
import { Form, Title, FormGroup } from "./styles";
import { BakeryContext } from "../../context/BakeryContext";
import CondominiumSchema from "../../utils/Schemas/CondominiumSchema";
import ErrorMessage from "../ErrorMessage";
import ClearForm from "../../utils/Functions/ClearForm";

const Condominio = (props) => {
  const [values, setValues] = React.useState({
    name: "",
    plan_name: "",
    plan_price: 0,
    plan_deadline_orders_morning: 0,
    plan_deadline_orders_afternoon: 0,
    street_name: "",
    number: "",
    city: "",
    state: "",
    zip_code: "",
    complement: "",
  });
  const [erros, setErros] = React.useState({});
  const { data, bakeryOptions } = React.useContext(BakeryContext);
  const [options, setOptions] = React.useState("");

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleBlur() {
    setErros(CondominiumSchema(values));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bakery = ObjVal(data).find(
      (bakeries) => bakeries.id === options
    );
    const haveErros = ObjVal(CondominiumSchema(values)).length;
    setErros(CondominiumSchema(values));
    if (haveErros === 0) {
      try {
        api.post("condominiums", {
          ...values,
          bakery,
          subscriptionPlan: {
            name: "basic",
            price: 0,
            deadline_orders_morning: 0,
            deadline_orders_afternoon: 0,
          },
        });
        toast.success("Condomínio cadastrado!");
        setValues(ClearForm(values));
        setOptions("");
      } catch (error) {}
    }
  }

  const handleSelectBakery = ({ target }) => {
    setOptions(target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Title>{props.label}</Title>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
            <FormControl fullWidth>
              <InputLabel id="padarias">Padaria</InputLabel>
              <Select
                id="padarias"
                value={options}
                onChange={handleSelectBakery}
                autoWidth
                label="Padria"
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {ObjVal(bakeryOptions()).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              {erros.complement && <ErrorMessage message={erros.complement} />}
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
  );
};

export default Condominio;
