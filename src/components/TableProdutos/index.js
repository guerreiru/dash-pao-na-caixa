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
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.items.map((data) => (
            <TableRow
              key={data.product_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data.product}</TableCell>
              <TableCell align="right">{data.quantity}</TableCell>
              <TableCell align="right">
                {FormatPrice(data.price)}
              </TableCell>
              <TableCell align="right">
                {FormatPrice(data.subtotal)}
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
