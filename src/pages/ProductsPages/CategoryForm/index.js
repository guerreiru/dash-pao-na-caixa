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
} from "./styles";

import { api } from "../../../services/api";
import ClearForm from "../../../utils/Functions/ClearForm";

const CategoryForm = () => {
  const [values, setValues] = React.useState({
    name: "",
  });
  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  React.useEffect(() => {
    if (categoryId) {
      try {
        api.get(`categories/${categoryId}`).then((res) => {
          setValues({
            name: res.data.name,
            email: res.data.email,
            cell_phone: res.data.cell_phone,
            cpf: res.data.cpf,
            user_name: res.data.user_name,
            password: res.data.password,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [categoryId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const categoria = {
      name: values.name,
    };

    if (categoryId) {
      try {
        await api.put(`categories/${categoryId}`, categoria);
        toast.success("Categoria editada!");
        setValues(ClearForm(values));
        navigate("/categorias");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("categories", categoria);
        toast.success("Categoria cadastrada!");
        setValues(ClearForm(values));
        navigate("/categorias");
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/categorias");
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Categoria</h3>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="name"
                    label="Nome da categoria"
                    type="text"
                    onChange={handleChange}
                    value={values.name || ""}
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

export default CategoryForm;
