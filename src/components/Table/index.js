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
import { toast } from "react-toastify";
// import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";
import { Container, BtnOptions } from "./styles";
import { api } from "../../services/api";

export default function DateTable(props) {
  const [data, setData] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [itemSeleted, setItemSeleted] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleOpen = (data) => {
    setAlertOpen(true);
    setItemSeleted(data);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  function handleConfirm() {
    handleDelete(itemSeleted.id);
    handleClose();
  }

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
              <TableCell>Nome</TableCell>
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{data.name || data.user_name}</TableCell>
                <TableCell>
                  <BtnOptions>
                    {location.includes("users") ? null : (
                      <HiUser
                        title="Usuários"
                        onClick={() => navigate(`${data.id}/users`)}
                        size="16px"
                        className="btnAdd"
                      />
                    )}
                    <FiTrash
                      title="Excluir"
                      onClick={() => handleOpen(data)}
                      size="16px"
                      className="btnDelete"
                    />
                  </BtnOptions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog open={alertOpen} item={itemSeleted}>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          style={{ marginRight: "5px" }}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained" onClick={handleConfirm}>
          Confirmar
        </Button>
      </AlertDialog>
    </Container>
  );
}
