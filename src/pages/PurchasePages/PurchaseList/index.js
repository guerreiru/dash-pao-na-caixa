import { Grid, Button } from "@material-ui/core";
import React from "react";

import TableProdutos from "../../../components/TableProdutos";
import TableResumo from "../../../components/TableResumo";
import { api } from "../../../services/api";
import { SetBodyWidth } from "../../../utils/Functions/SetBodyWidth";
import {
  Container,
  Content,
  ContentHeader,
  FormGroup,
  ResultHeader,
  ResidentTitle,
  ResumoTitle,
} from "./styles";

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

const PurchaseList = () => {
  const [date, setDate] = React.useState(setDefaultDate());
  const [cond, setCond] = React.useState([]);
  const [condOptions, setCondOptions] = React.useState([]);
  const [condSelected, setCondSelected] = React.useState({
    id: "0",
    name: "",
  });

  const [bake, setBak] = React.useState([]);
  const [bakeSelected, setBakeSelected] = React.useState({
    id: "0",
    name: "",
  });

  const [turno, setTurno] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    SetBodyWidth();
  }, [bakeSelected, condSelected, turno, results]);

  React.useEffect(() => {
    loadBake();
  }, []);

  React.useEffect(() => {
    loadCond();
  }, []);

  React.useEffect(() => {
    async function getConByBakeryId() {
      const conByBakeryId = cond.filter(
        (cond) => cond.bakery.id === +bakeSelected.id
      );
      setCondOptions(conByBakeryId);
    }
    getConByBakeryId();
  }, [bakeSelected, cond]);

  async function loadBake() {
    const res = await api.get(`bakeries`);
    setBak(res.data.data);
  }

  async function loadCond() {
    const res = await api.get(`condominiums`);
    setCond(res.data.data);
  }

  function setDefaultDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function handleBakeSelected(ev) {
    const bakeryName = bake.filter((bakery) => bakery.id === +ev.target.value);
    setBakeSelected({
      id: ev.target.value,
      name: bakeryName[0].name,
    });

    setCondSelected({ id: 0, name: "" });
    setTurno("");
  }

  function handleCondSelected(ev) {
    const condominium = cond.filter(
      (condominium) => condominium.id === +ev.target.value
    );
    setCondSelected({
      id: ev.target.value,
      name: condominium[0].name,
    });
  }

  async function handleSubmit() {
    const res = await api.get(
      `purchase-orders?page=1&size=20&period=${turno}&condominium=${condSelected.id}&purchase_datetime=${date}`
    );
    setResults(res.data);
  }

  return (
    <Container className="body">
      <Content className="content">
        <ContentHeader>
          <h3>Pedidos</h3>
        </ContentHeader>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="noprint"
        >
          <Grid item xs={6} sm={6} md={3}>
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

          <Grid item xs={6} sm={6} md={3}>
            <FormGroup>
              <label htmlFor="padaria">Padaria</label>
              <select
                id="padaria"
                value={bakeSelected.id}
                onChange={handleBakeSelected}
              >
                <option value="0" disabled>
                  Selecione a Padaria
                </option>
                {bake.map((bakery) => (
                  <option key={bakery.id} value={bakery.id}>
                    {bakery.name}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Grid>

          {bakeSelected.id > 0 ? (
            <Grid item xs={6} sm={6} md={3}>
              <FormGroup>
                <label htmlFor="condominio">Condomínio</label>
                <select
                  id="condominio"
                  value={condSelected.id}
                  onChange={handleCondSelected}
                >
                  <option value="0" disabled>
                    Selecione o Condomínio
                  </option>
                  {condOptions.map((condominium) => (
                    <option key={condominium.id} value={condominium.id}>
                      {condominium.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Grid>
          ) : null}

          {condSelected.id > 0 ? (
            <Grid item xs={6} sm={6} md={3}>
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
                    <option key={turno.value} value={turno.value}>
                      {turno.label}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Grid item xs={12} sm={4} md={2}>
              <Button
                disabled={turno === ""}
                type="button"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <ResultHeader>
          <h3>{bakeSelected.name}</h3>
          <h3>{condSelected.name}</h3>
          <h3>
            {turno ? (
              <>
                {new Date(`${date} 00:00:00`).toLocaleDateString()} -{" "}
                {turno === "0" ? "Manhã" : "Tarde"}
              </>
            ) : null}
          </h3>
        </ResultHeader>

        {results.data ? (
          <>
            {results.data.map((data) => (
              <span key={data.id}>
                <ResidentTitle>
                  <h4>
                    Residente: {data.resident.name} - Apto.{" "}
                    {data.resident.apartment_number}
                  </h4>
                </ResidentTitle>
                <TableProdutos data={data} />
              </span>
            ))}
            <ResumoTitle>
              <h2>Resumo</h2>
            </ResumoTitle>
            <TableResumo data={results.summary} />
          </>
        ) : (
          <p style={{ marginTop: "20px" }}>Insira dados válidos!</p>
        )}
      </Content>
    </Container>
  );
};

export default PurchaseList;
