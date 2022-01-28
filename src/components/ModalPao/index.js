import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { BsCreditCard } from "react-icons/bs";
import { FormGroup, CardPix } from "./styles";
import pixIcon from '../../assets/pix.png'
import pixQrCode from '../../assets/pixqrcode.png'

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

export default function ModalPao({ modalIsOpen, handleClose, handlePurchase }) {
  const [paymentType, setPaymentType] = React.useState("")
  const [cardType, setCardType] = React.useState("")

  function handleTypeCard(ev) {
    setCardType(ev.target.value);
  }

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
            Selecione a forma de pagamento
          </Typography>

          <div style={{ marginBottom: "5px" }}>
            <Button
              onClick={() => setPaymentType("pix")}
              type="button"
              startIcon={<img src={pixIcon} alt="Pix" width="24" />}
              style={{ width: '115px', marginRight: '5px', color: "#555" }}
            >
              Pix
            </Button>

            <Button
              onClick={() => setPaymentType("cartao")}
              type="button"
              startIcon={<BsCreditCard color="#1565C0" />}
              style={{ color: "#555" }}
            >
              Cartão
            </Button>
          </div>



          {paymentType === "pix" ? (
            <CardPix sx={{ mt: 2 }}>
              <img src={pixQrCode} alt="Pix qr code" />
              <p>
                Banco: Banco do Brasil<br />
                Nome: José da Silva<br />
                Chave: 88999999999
              </p>
            </CardPix>
          ) : null}


          {paymentType === "cartao" ? (
            <>
              <FormControl>
                <FormLabel id="card-type">Tipo do cartão {cardType}</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="card-type"
                  defaultValue="credito"
                  name="radio-buttons-group"
                  onChange={handleTypeCard}
                >
                  <FormControlLabel value="credito" control={<Radio />} label="Crédito" />
                  <FormControlLabel value="debito" control={<Radio />} label="Débito" />
                </RadioGroup>
              </FormControl>

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
                    onClick={handlePurchase}
                  >
                    Pagar
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : null}


        </Box>
      </Modal>
    </div>
  );
}
