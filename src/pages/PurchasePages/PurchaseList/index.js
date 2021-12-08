import { Grid, Button } from "@material-ui/core";
import React from "react";
import Header from "../../../components/Header";
import TableProdutos from "../../../components/TableProdutos";
import { api } from "../../../services/api";
import {
  Container,
  Content,
  ContentHeader,
  FormGroup,
  ResultHeader,
  ResidentTitle,
  ResumoTitle,
} from "./styles";

const turnos = ["Manhã", "Tarde"];

const PurchaseList = () => {
  const [date, setDate] = React.useState(setDefaultDate());
  const [condominiums, setCondominiums] = React.useState([]);
  const [condominiumOptions, setCondominiumOptions] = React.useState([]);
  const [condominiumSelected, setCondominiumSelected] = React.useState({
    id: "0",
    name: "",
  });

  const [bakeries, setBakeries] = React.useState([]);
  const [bakerySelected, setBakerySelected] = React.useState({
    id: "0",
    name: "",
  });

  const [turno, setTurno] = React.useState("");

  React.useEffect(() => {
    loadBakeries();
  }, [bakeries]);

  React.useEffect(() => {
    loadCondominiums();
  }, [condominiums]);

  React.useEffect(() => {
    async function getConByBakeryId() {
      const conByBakeryId = condominiums.filter(
        (cond) => cond.bakery.id === +bakerySelected.id
      );
      setCondominiumOptions(conByBakeryId);
    }
    getConByBakeryId();
  }, [bakerySelected, condominiums]);

  async function loadBakeries() {
    const res = await api.get(`bakeries`);
    setBakeries(res.data.data);
  }

  async function loadCondominiums() {
    const res = await api.get(`condominiums`);
    setCondominiums(res.data.data);
  }

  function setDefaultDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function handleBakerySelected(ev) {
    const bakeryName = bakeries.filter(
      (bakery) => bakery.id === +ev.target.value
    );
    setBakerySelected({
      id: ev.target.value,
      name: bakeryName[0].name,
    });

    setCondominiumSelected({ id: 0, name: "" });
  }

  function handleCondominiumSelected(ev) {
    const condominium = condominiums.filter(
      (condominium) => condominium.id === +ev.target.value
    );
    setCondominiumSelected({
      id: ev.target.value,
      name: condominium[0].name,
    });
  }

  return (
    <Container>
      <Header loc="/dash" />
      <Content>
        <ContentHeader>
          <h3>Pedidos</h3>
        </ContentHeader>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormGroup>
              <label htmlFor="purchase_datetime">Data do pedido</label>
              <input
                id="purchase_datetime"
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormGroup>
              <label htmlFor="padaria">Padaria</label>
              <select
                id="padaria"
                value={bakerySelected.id}
                onChange={handleBakerySelected}
              >
                <option value="0" disabled>
                  Selecione a Padaria
                </option>
                {bakeries.map((bakery) => (
                  <option key={bakery.id} value={bakery.id}>
                    {bakery.name}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Grid>

          {bakerySelected.id > 0 ? (
            <Grid item xs={12} sm={6} md={3}>
              <FormGroup>
                <label htmlFor="condominio">Condomínio</label>
                <select
                  id="condominio"
                  value={condominiumSelected.id}
                  onChange={handleCondominiumSelected}
                >
                  <option value="0" disabled>
                    Selecione o Condomínio
                  </option>
                  {condominiumOptions.map((condominium) => (
                    <option key={condominium.id} value={condominium.id}>
                      {condominium.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Grid>
          ) : null}

          {condominiumSelected.id > 0 ? (
            <Grid item xs={12} sm={6} md={3}>
              <FormGroup>
                <label htmlFor="turno">Turno</label>
                <select
                  id="turno"
                  value={turno}
                  onChange={({ target }) => setTurno(target.value)}
                >
                  <option value="" disabled>
                    Turno
                  </option>
                  {turnos.map((turno) => (
                    <option key={turno} label={turno}>
                      {turno}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button disabled={turno === ""} type="button" variant="contained">
              Filtrar
            </Button>
          </Grid>
        </Grid>

        <ResultHeader>
          <h3>
            {bakerySelected.name} {`- ${condominiumSelected.name} `}{" "}
            {`- ${turno}`}
          </h3>
        </ResultHeader>

        <ResidentTitle>
          <h4>Residente: Fernando - Apto. 12</h4>
        </ResidentTitle>
        <TableProdutos />

        <ResidentTitle>
          <h4>Residente: Luiz - Apto. 15</h4>
        </ResidentTitle>
        <TableProdutos />

        <ResumoTitle>
          <h2>Resumo</h2>
        </ResumoTitle>
        <TableProdutos />
      </Content>
    </Container>
  );
};

export default PurchaseList;
