import { Grid, Button } from "@material-ui/core";
import React from "react";
import jwtDecode from "jwt-decode";

import TableProdutos from "../../../components/TableProdutos";
import TableResumo from "../../../components/TableResumo";
import { api } from "../../../services/api";
import { SetBodyWidth } from "../../../utils/Functions/SetBodyWidth";
import {
  Container,
  Content,
  ContentHeader,
  FormGroup,
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
  const [condSelected, setCondSelected] = React.useState({
    id: "0",
    name: "",
  });

  const [turno, setTurno] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    SetBodyWidth();
  }, [condSelected, turno, results]);

  React.useEffect(() => {
    const user = localStorage.getItem("authData");
    if (user) {
      const userParsed = JSON.parse(user);
      const userDecoded = jwtDecode(userParsed.access_token);

      if (userDecoded.user.condominium) {
        setCondSelected({
          id: userDecoded.user.condominium.id,
          name: userDecoded.user.condominium.name,
        });
        setTurno("");
      }
    }
  }, []);

  function setDefaultDate() {
    return new Date().toISOString().slice(0, 10);
  }

  async function handleSubmit() {
    const res = await api.get(
      `purchase-orders?page=1&size=20&period=${turno}&condominium=${condSelected.id}&purchase_datetime=${date}`
    );
    console.log(res);
    setResults(res.data);
  }

  return (
    <Container className="body">
      <Content className="content">
        <ContentHeader>
          <h3>Histórico de pedidos</h3>
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

          {date !== "" ? (
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
