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
import {
  Container,
  Content,
  FormContainer,
  FormHeader,
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
    imgUrl:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
    isActive: true,
    unitName: "",
    unitAcronyms: ""
  });
  const [categories, setCategories] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState([]);

  const [units, setUnits] = React.useState([]);
  const [unitSelected, setUnitSelected] = React.useState("");

  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const { id: bakeryId } = useParams();
  const { productId } = useParams();

  React.useEffect(() => {
    async function getCategories() {
      const res = await api.get(`categories`);
      setCategories(res.data.data);
    }

    getCategories();
  }, [categories]);

  React.useEffect(() => {
    async function getUnits() {
      const res = await api.get(`units`);
      setUnits(res.data.data);
    }

    getUnits();
  }, [units]);

  React.useEffect(() => {
    if (productId) {
      try {
        api.get(`products/${productId}`).then((res) => {
          setValues({
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            imgUrl: res.data.imgUrl,
            // unitName: res.data.unit.name,
            // unitAcronyms: res.data.unit.acronyms,
            isActive: res.data.isActive,
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
    const bakery = await api.get(`bakeries/${bakeryId}`);
    delete bakery.data.id;

    const product = {
      name: values.name,
      description: values.description,
      price: values.price,
      imgUrl: values.imgUrl,
      isActive: values.isActive,
      unit: {
        name: unitSelected.split(",")[0],
        acronyms: unitSelected.split(",")[1],
      },
      categories: categorySelected,
      bakery,
    };

    if (productId) {
      try {
        await api.put(`products/${productId}`, product);
        toast.success("Produto editada!");
        setValues(ClearForm(values));
        navigate("/produtos/1");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("products", product);
        toast.success("Produto cadastrada!");
        setValues(ClearForm(values));
        navigate("/produtos/1");
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
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Nome"
                  type="text"
                  onChange={handleChange}
                  value={values.name || ""}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <InputImage>
                  <input type="file" id="logo" />
                  <label htmlFor="logo">Escolher arquivo</label>
                </InputImage>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Descrição"
                  type="text"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  value={values.description || ""}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="select-categoria">Categoria</InputLabel>
                  <Select
                    labelId="select-categoria"
                    id="select-categoria"
                    label="Categoria"
                    onChange={({ target }) =>
                      setCategorySelected([target.value])
                    }
                    fullWidth
                    value={categorySelected}
                  >
                    <MenuItem value="">
                      <em>Slecione</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="select-unit">Medida</InputLabel>
                  <Select
                    labelId="select-unit"
                    id="select-unit"
                    label="Medida"
                    onChange={({ target }) => setUnitSelected(target.value)}
                    fullWidth
                    value={unitSelected}
                  >
                    <MenuItem value="">
                      <em>Slecione</em>
                    </MenuItem>
                    {units.map((unit) => (
                      <MenuItem
                        style={{ textTransform: "capitalize" }}
                        key={unit.id}
                        value={`${unit.name},${unit.acronyms}`}
                      >
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="price"
                  label="Preço"
                  type="number"
                  onChange={handleChange}
                  value={values.price || ""}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="select-unit">Status do produto</InputLabel>
                  <Select
                    labelId="select-unit"
                    id="select-unit"
                    label="Status do produto"
                    onChange={handleChange}
                    fullWidth
                    value={values.isActive}
                  >
                    <MenuItem value="">
                      <em>Slecione</em>
                    </MenuItem>
                    <MenuItem value="true">Ativo</MenuItem>
                    <MenuItem value="false">Inativo</MenuItem>
                  </Select>
                </FormControl>
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
