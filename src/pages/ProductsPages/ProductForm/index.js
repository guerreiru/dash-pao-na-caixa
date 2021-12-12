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
import { api } from "../../../services/api";
import ClearForm from "../../../utils/Functions/ClearForm";

const ProductForm = () => {
  const [values, setValues] = React.useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    isActive: true,
    unitName: "",
    unitAcronyms: "",
    categories: []
  });
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const { id: productId } = useParams();

  React.useEffect(() => {
    if (productId) {
      try {
        api.get(`products/${productId}`).then((res) => {
          setValues({
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            imgUrl: res.data.imgUrl,
            isActive: res.data.isActive,
            unitName: res.data.unit.name,
            unitAcronyms: res.data.unit.acronyms,
            categories: [res.data.categories],
          });
          setTitle(res.data.name);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [productId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const product = {
      name: values.name,
      description: values.description,
      price: values.price,
      imgUrl: values.imgUrl,
      isActive: values.isActive,
      unit: {
        name: values.unitName,
        acronyms: values.unitAcronyms,
      },
      categories: [values.categories],
    };

    if (productId) {
      try {
        await api.put(`products/${productId}`, product);
        toast.success("Produto editada!");
        setValues(ClearForm(values));
        navigate("/produtos");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("products", product);
        toast.success("Produto cadastrada!");
        setValues(ClearForm(values));
        navigate("/produtos");
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/produtos");
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>{productId ? `Editar ${title}` : "Adicionar Produto"}</h3>
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
                    name="description"
                    label="Descrição"
                    type="text"
                    onChange={handleChange}
                    value={values.description || ""}
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
                    value={values.price || ""}
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

export default ProductForm;
