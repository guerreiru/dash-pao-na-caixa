import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaEdit, FaSearch } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Container,
  Content,
  SearchInput,
  TableContainer,
  TableHeader,
} from "./styles";
import Header from "../../../components/Header";
import { api } from "../../../services/api";
import { FormatPrice } from "../../../utils/Functions/FormatPrice";
import { toast } from "react-toastify";

const ProductsList = () => {
  const [products, setProducts] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await api.get("products");
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAdd() {
    navigate("adicionar");
  }

  function handleEdit(id) {
    navigate(`${id}/editar`);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`products/${id}`);
      toast.warning("Deletado!");

      const updatedData = [...products];
      const itemIndex = updatedData.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        updatedData.splice(itemIndex, 1);
        setProducts(updatedData);
      } else {
        throw Error();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function ItemCard(item) {
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {FormatPrice(item.price)}
            </Typography>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleEdit(item.id)}>
              <FaEdit title="Editar" className="btnEdit" />
            </IconButton>

            <IconButton onClick={() => handleDelete(item.id)}>
              <FiTrash title="Excluir" className="btnDelete" />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  function searchStringInArray(str) {
    setBusca(str);
    const resultsArray = [...results];
    if (str.length > 2) {
      for (var j = 0; j < products.length; j++) {
        if (products[j].name.toLowerCase().match(str.toLowerCase())) {
          resultsArray.push(products[j]);
          setProducts(resultsArray);
        }
      }
    } else if (str.length === 0) {
      loadProducts();
      clearBusca();
    }
  }

  function clearBusca() {
    setBusca("");
    setResults([]);
  }
  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <TableContainer>
          <TableHeader>
            <h3>Produtos</h3>
            <SearchInput>
              <FaSearch color="#737373" onClick={searchStringInArray} />
              <input
                value={busca}
                onChange={({ target }) => searchStringInArray(target.value)}
                type="text"
                placeholder="Pesquisar"
              />
              {busca && (
                <TiDeleteOutline color="#737373" onClick={clearBusca} />
              )}
            </SearchInput>
            <Button
              type="button"
              variant="contained"
              startIcon={<FiPlus />}
              onClick={handleAdd}
              className="btnAddDesktop"
            >
              Adicionar
            </Button>

            <IoPersonAdd
              title="Adicionar"
              size="34"
              className="btnAddMobile"
              onClick={handleAdd}
            />
          </TableHeader>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {products.length > 0 && results.length === 0
              ? products.map((product) => ItemCard(product))
              : results.map((product) => ItemCard(product))}
          </Grid>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default ProductsList;
