import React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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
import { BakeryContext } from "../../../context/BakeryContext";
import { SubscriptionContext } from "../../../context/SubscriptionContext";
import ClearForm from "../../../utils/Functions/ClearForm";
import ObjVal from "../../../utils/Functions/ObjecValue";

const CondominiumForm = () => {
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
  const { bakeries, bakeryOptions } = React.useContext(BakeryContext);
  const [bakeryItems, setBakeryOptions] = React.useState("");

  const { subscriptions, subscriptionOptions } =
    React.useContext(SubscriptionContext);
  const [subscriptionsItems, setSubscriptionsOptions] = React.useState("");
  const [title, setTitle] = React.useState("");

  const navigate = useNavigate();
  const { id: condominiumId } = useParams();

  React.useEffect(() => {
    if (condominiumId) {
      try {
        api.get(`condominiums/${condominiumId}`).then((res) => {
          setValues({
            name: res.data.name,
            street_name: res.data.address.street_name,
            number: res.data.address.number,
            city: res.data.address.city,
            state: res.data.address.state,
            zip_code: res.data.address.zip_code,
            complement: res.data.address.complement,
          });
          setTitle(res.data.name);
          setBakeryOptions(res.data.bakery.id)
          setSubscriptionsOptions(res.data.subscriptionPlan.id)
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [condominiumId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bakery = ObjVal(bakeries).find(
      (bakeries) => bakeries.id === bakeryItems
    );

    const subscriptionPlan = ObjVal(subscriptions).find(
      (subscription) => subscription.id === subscriptionsItems
    );
    
    const condominium = {
      name: values.name,
      bakery,
      subscriptionPlan,
      address: {
        street_name: values.street_name,
        number: Number(values.number),
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        complement: values.complement,
      },
    };

    if (condominiumId) {
      try {
        api.put(`condominiums/${condominiumId}`, condominium);
        setBakeryOptions("");
        toast.success("Condomínio editado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      } catch (error) {}
    } else {
      try {
        api.post("condominiums", condominium);
        setBakeryOptions("");
        toast.success("Condomínio cadastrado!");
        setValues(ClearForm(values));
        navigate("/condominios");
      } catch (error) {}
    }
  }

  const handleSelectBakery = ({ target }) => {
    setBakeryOptions(target.value);
  };

  const handleSelectPlan = ({ target }) => {
    setSubscriptionsOptions(target.value);
  };

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
            <h3>
              {condominiumId ? `Editar ${title}` : "Adicionar Condomínio"}
            </h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="padarias">Padaria</InputLabel>
                  <Select
                    id="padarias"
                    value={bakeryItems}
                    onChange={handleSelectBakery}
                    fullWidth
                    label="Padaria"
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

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="subscription-plans">Planos</InputLabel>
                  <Select
                    id="subscription-plans"
                    value={subscriptionsItems}
                    onChange={handleSelectPlan}
                    fullWidth
                    label="Planos"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {ObjVal(subscriptionOptions()).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="street_name"
                    label="Rua"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.street_name}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="number"
                    label="Número"
                    type="number"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.number}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="city"
                    label="Cidade"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.city}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="state"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.state}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="zip_code"
                    label="CEP"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.zip_code}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <TextField
                    name="complement"
                    label="Complemento"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.complement}
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

export default CondominiumForm;
