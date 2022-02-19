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

const UnitForm = () => {
  const [values, setValues] = React.useState({
    name: "",
    acronyms: "",
  });
  const navigate = useNavigate();
  const { id: unitId } = useParams();

  React.useEffect(() => {
    if (unitId) {
      try {
        api.get(`units/${unitId}`).then((res) => {
          setValues({
            name: res.data.name,
            acronyms: res.data.acronyms,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [unitId]);

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const unidade = {
      name: values.name,
      acronyms: values.acronyms,
    };

    if (unitId) {
      try {
        await api.put(`units/${unitId}`, unidade);
        toast.success("Unidade editada!");
        setValues(ClearForm(values));
        navigate("/unidade");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.post("units", unidade);
        toast.success("Unidade cadastrada!");
        setValues(ClearForm(values));
        navigate("/unidade");
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCancel() {
    setValues(ClearForm(values));
    navigate("/unidade");
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <FormHeader>
            <h3>Adicionar Unidade</h3>
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
                    label="Nome da unidade"
                    type="text"
                    onChange={handleChange}
                    value={values.name || ""}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <FormGroup>
                  <TextField
                    name="acronyms"
                    label="Sigla da unidade"
                    type="text"
                    onChange={handleChange}
                    value={values.acronyms || ""}
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

export default UnitForm;
