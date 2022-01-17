import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  TextField
} from '@material-ui/core';
import { FormGroup } from "./styles";
import pixIcon from '../../assets/pix.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "calc(100% - 20px)",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
};

export default function ModalPao({ modalIsOpen, handleOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Selecione a forma de pagameno
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={pixIcon}
              height="32"
              alt="Pagamento com pix"
            />
            <img
              src={pixIcon}
              height="32"
              alt="Pagamento com pix"
            />

            <form>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name="name"
                      label="Número do cartão"
                      type="text"
                      onChange={() => { }}
                      fullWidth
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name="nome"
                      label="Nome impresso no cartão"
                      type="email"
                      onChange={() => { }}
                      fullWidth
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name=""
                      label="Data de expiração"
                      type="text"
                      onChange={() => { }}
                      fullWidth
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={4} md={6}>
                  <FormGroup>
                    <TextField
                      name=""
                      label="Código de segurança"
                      type="text"
                      onChange={() => { }}
                      fullWidth
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginRight: "5px" }}
                  >
                    Gravar
                  </Button>
                  <Button variant="outlined" color="error">
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
