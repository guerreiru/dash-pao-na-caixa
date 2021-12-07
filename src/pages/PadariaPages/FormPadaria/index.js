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
  InputImage,
} from "./styles";
import Header from "../../../components/Header";
// import ErrorMessage from "../../../components/ErrorMessage";
import { api } from "../../../services/api";
// import BakerySchema from "../../../utils/Schemas/BakerySchema";
import ClearForm from "../../../utils/Functions/ClearForm";
// import ObjVal from "../../../utils/Functions/ObjecValue";

const FormPadaria = () => {
  const [values, setValues] = React.useState({
    name: "",
    imgLogo: "",
    street_name: "",
    number: "",
    city: "",
    state: "",
    zip_code: "",
    complement: "",
    bank_code: "",
    agency: "",
    account: "",
    account_type: "CHECKING",
  });
  const [bankDataId, setBankDataID] = React.useState(null)
  const [title, setTitle] = React.useState("")
  // const [erros, setErros] = React.useState({});
  const navigate = useNavigate();
  const { id: bakeryId } = useParams();

  React.useEffect(() => {
    if (bakeryId) {
      try {
        api.get(`bakeries/${bakeryId}`).then((res) => {
          setValues({
            name: res.data.name,
            street_name: res.data.address.street_name,
            number: res.data.address.number,
            city: res.data.address.city,
            state: res.data.address.state,
            zip_code: res.data.address.zip_code,
            complement: res.data.address.complement,
            bank_code: res.data.bankData.bank_code,
            agency: res.data.bankData.agency,
            account: res.data.bankData.account,
            account_type: res.data.bankData.account_type,
          });
          setBankDataID(res.data.bankData.id)
          setTitle(res.data.name)
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [bakeryId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  // function handleBlur() {
  //   setErros(BakerySchema(values));
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    // const haveErros = ObjVal(BakerySchema(values)).length;
    // setErros(BakerySchema(values));

    const bakery = {
      name: values.name,
      imgLogo: "https://cdn-icons-png.flaticon.com/512/992/992747.png",
      address: {
        street_name: values.street_name,
        number: Number(values.number),
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        complement: values.complement,
      },
      bankData: {
        id: bankDataId,
        bank_code: Number(values.bank_code),
        agency: values.agency,
        account: Number(values.account),
        account_type: 0,
      },
    };

    if (bakeryId) {
      try {
        await api.put(`bakeries/${bakeryId}`, bakery);
        toast.success("Padaria editada!");
        setValues(ClearForm(values));
        navigate("/padarias");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("bakeries", bakery);
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
            <h3>{bakeryId ? `Editar ${title}` : "Adicionar Padaria"}</h3>
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
                    // onBlur={handleBlur}
                    value={values.name || ""}
                    fullWidth
                  />
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
                    // onBlur={handleBlur}
                    value={values.street_name || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="number"
                    label="Número"
                    type="number"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.number || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="city"
                    label="Cidade"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.city || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="state"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.state || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="zip_code"
                    label="CEP"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.zip_code || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <FormGroup>
                  <TextField
                    name="complement"
                    label="Complemento"
                    type="text"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.complement || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <h5>Dados bancários</h5>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="bank_code"
                    label="Código do Banco"
                    type="tel"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.bank_code || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="agency"
                    label="Agência"
                    type="tel"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.agency || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <FormGroup>
                  <TextField
                    name="account"
                    label="Conta"
                    type="tel"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.account || ""}
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

export default FormPadaria;
