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
import { Container } from "./styles";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function DateTable(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  async function handleDelete(id) {
    try {
      await api.delete(`${props.apiRoute}/${id}`);
      toast.warning("Deletado!");

      const updatedData = [...data];
      const itemIndex = updatedData.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        updatedData.splice(itemIndex, 1);
        setData(updatedData);
      } else {
        throw Error();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
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
            {data.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  <span>
                    <FaEdit size="16px" />
                    <FiTrash
                      onClick={() => handleDelete(data.id)}
                      color="#FF7A7A"
                      size="16px"
                    />
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
