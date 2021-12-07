import React from "react";
import { Button, Grid, MenuItem, TextField } from "@material-ui/core";
import Header from "../../../components/Header";
import TableProdutos from "../../../components/TableProdutos";
import { api } from "../../../services/api";
import ObjVal from "../../../utils/Functions/ObjecValue";
import { BakeryContext } from "../../../context/BakeryContext";
import { Container, Content, TableContainer, TableHeader, ItemPedido } from "./styles";
import TableResumo from "../../../components/TableResumo";

const turnos = [
  {
    value: 0,
    label: "Manhã",
  },
  {
    value: 1,
    label: "Tarde",
  },
];

const PedidosList = () => {
  const { bakeryOptions } = React.useContext(BakeryContext);

  const [bakery, setBakery] = React.useState("");

  const [date, setDate] = React.useState(setDefaultDate());
  const [condominiums, setCondominiums] = React.useState([]);
  const [condominiumSelected, setCondominiumSelected] = React.useState("");
  const [turno, setTurno] = React.useState(0);

  async function loadCondominiums(bakeryId) {
    try {
      const res = await api.get("condominiums");
      const condominiumsArray = res.data.data;
      const condominiumsByBakeryId = condominiumsArray.filter(
        (item) => item.bakery.id === bakeryId
      );
      setCondominiums(condominiumsByBakeryId);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectBakery({ target }) {
    setBakery(target.value);
    loadCondominiums(target.value);
  }

  function setDefaultDate() {
    return new Date().toISOString().slice(0, 10);
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <TableContainer>
          <TableHeader>
            <h3>Pedidos</h3>
          </TableHeader>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                name="purchase_datetime"
                label="Data"
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
                helperText="Selecione a data dos pedidos"
                fullWidth
              />
            </Grid>

            {date.length !== 0 ? (
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  id="bakery"
                  select
                  label="Padaria"
                  value={bakery}
                  onChange={handleSelectBakery}
                  helperText="Selecione a padaria"
                  fullWidth
                >
                  {ObjVal(bakeryOptions()).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}

            {bakery.length !== 0 ? (
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  id="condominiums"
                  select
                  label="Condominínio"
                  value={condominiumSelected || ""}
                  onChange={({ target }) =>
                    setCondominiumSelected(target.value)
                  }
                  helperText="Selecione o condomínio"
                  fullWidth
                >
                  {condominiums.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}

            {condominiumSelected.length !== 0 ? (
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  id="turno"
                  select
                  label="Turno"
                  value={turno}
                  onChange={({ target }) => setTurno(target.value)}
                  helperText="Selecione o turno"
                  fullWidth
                >
                  {turnos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}

            {bakery.length !== 0 && condominiumSelected.length !== 0 ? (
              <Grid item xs={12} sx={{ marginBottom: "16px" }}>
                <Button type="button" variant="contained">
                  Filtrar
                </Button>
              </Grid>
            ) : null}
          </Grid>

          <h3>
            Padaria: Padaria Santo Antônio - Condominínio: Condominínio FAMA
          </h3>

          <ItemPedido>
            <h4>Residente: Jośe Silva - Apartamento: 12</h4>
            <h5>Itens do pedido</h5>
            <TableProdutos />
          </ItemPedido>

          <ItemPedido>
            <h4>Residente: Roberta - Apartamento: 20</h4>
            <h5>Itens do pedido</h5>
            <TableProdutos />
          </ItemPedido>

          <h4 style={{marginTop: "16px"}} >Resumo</h4>
          <TableResumo />

        </TableContainer>
      </Content>
    </Container>
  );
};

export default PedidosList;
