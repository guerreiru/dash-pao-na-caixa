import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Container, TableHeader, SearchInput } from "./styles";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FiTrash, FiPlus } from "react-icons/fi";

function createData(name, calories, icon) {
  return { name, calories, icon };
}

export default function DenseTable(props) {
  return (
    <Container>
      <TableHeader>
        <h3>{props.label}</h3>
        <SearchInput>
          <FaSearch color="#737373" />
          <input type="search" placeholder="Pesquisar" />
        </SearchInput>
        <Button type="button" variant="contained" startIcon={<FiPlus />}>
          Adicionar
        </Button>
      </TableHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  <span>
                    <FaEdit size="16px" />
                    <FiTrash color="#FF7A7A" size="16px" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
