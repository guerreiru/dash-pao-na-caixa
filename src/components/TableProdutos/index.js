import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { FormatPrice } from "../../utils/Functions/FormatPrice";

export default function TableProdutos(props) {

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Quantidade</TableCell>
            <TableCell align="right">Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data.product.name}</TableCell>
              <TableCell align="right">{data.quantity}</TableCell>
              <TableCell align="right">
                {FormatPrice(data.product.price)}
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
