import React from "react";
import { Button, FormGroup, Grid, TextField } from "@material-ui/core";
import { FiTrash } from "react-icons/fi";
import { api } from "../../services/api";
import { getUserConfig } from '../../utils/Functions/Auth';
import { Container, Content, TableContainer, ModalAddCard } from "./styles";

const Cards = () => {
  const [modal, setModal] = React.useState("none")
  const [creditCard, setCreditCard] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    api.get(`/credit-cards/${getUserConfig().id}`).then((card) => {
      if (mounted) {
        setCreditCard(card.data);
        setloading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  function AddCard() {
    return (
      <ModalAddCard display={modal}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <FormGroup>
              <TextField
                name="name"
                label="Número do cartão"
                type="text"
                onChange={() => { }}
                fullWidth
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <FormGroup>
              <TextField
                name="nome"
                label="Nome impresso no cartão"
                type="email"
                onChange={() => { }}
                fullWidth
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <FormGroup>
              <TextField
                name=""
                label="Data de expiração"
                type="text"
                onChange={() => { }}
                fullWidth
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <FormGroup>
              <TextField
                name=""
                label="Código de segurança"
                type="text"
                onChange={() => { }}
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
              Salvar
            </Button>
            <Button variant="outlined" color="error" onClick={() => setModal("none")} >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </ModalAddCard>
    )
  }

  if (loading) {
    return (
      <Container>
        <Content>
          <TableContainer>
            <h3>Aguarde...</h3>
          </TableContainer>
        </Content>
      </Container>
    )
  } else {
    return (
      <Container>
        <Content>
          <TableContainer>
            {creditCard !== "" ? (
              <>
                <h3>Cartões</h3>
                <p style={{ margin: "10px 0" }} >**** **** **** 1300 <FiTrash color="#ff7a7a" /></p>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setModal("block")}
                >
                  Adicionar cartão
                </Button>
              </>
            ) : (
              <>
                <h3>Cartões</h3>
                <p style={{ margin: "10px 0" }} >Nenhum cartão cadastrado!</p>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setModal("block")}
                >
                  Adicionar cartão
                </Button>
              </>
            )}

            <AddCard></AddCard>
          </TableContainer>
        </Content>
      </Container>
    )
  }
};

export default Cards;
