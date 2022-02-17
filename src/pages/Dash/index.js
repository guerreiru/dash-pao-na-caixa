import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Grid, Modal } from "@material-ui/core";
import HeadTitle from "../../components/HeadTitle"
import { Container, Content, TableContainer, CardBtnLink } from "./styles";
import { api } from "../../services/api";
import { getUserConfig } from "../../utils/Functions/Auth";


const Dash = () => {
  const [user, setUser] = React.useState({});
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false)
    handleModalSubscription()
  }

  React.useEffect(() => {
    async function loadUserInfo() {
      const user = await api.get("users/profile");
      // const subscription = await api.get("subscriptions");
      setUser(user.data);
    }
    loadUserInfo();
  }, []);

  React.useEffect(() => {
    const modalSubscription = localStorage.getItem("modalSubscription")
    if (modalSubscription === "false" || getUserConfig().roles[0] !== "ROLE_RESIDENT") {
      setOpen(false)
    }
  }, []);

  const style = {
    position: 'absolute',
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    p: 4,
  };

  function handleModalSubscription() {
    localStorage.setItem("modalSubscription", "false")
  }

  function ModalRecurrence() {
    return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <p>{open ? "Open" : "Close"}</p>
              <Alert severity="info">
                Atenção! Antes de você, fazer alguma compra é necessário ter uma assinatura ativa.
                Caso deseje você será direcionado para fazer a assinatura, ou então o procedimento
                pode ser realizado em outro momento.
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ marginRight: "5px" }}
                onClick={() => navigate(`/${user.id}/assinatura`)}
              >
                Confirmar
              </Button>
              <Button onClick={handleClose} variant="outlined" color="error" >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  }

  function cardLink(link) {
    navigate(link)
  }

  return (
    <Container>
      <HeadTitle
        title="Pão na caixa | Home"
        description="Página inicial da aplicação!"
      />
      <ModalRecurrence />
      <Content>
        <TableContainer>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={4} md={3}>
              <CardBtnLink onClick={() => cardLink("/produtos")} >
                Produtos
              </CardBtnLink>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <CardBtnLink onClick={() => cardLink("/perfil")} >
                Perfil
              </CardBtnLink>
            </Grid>
          </Grid>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Dash;
