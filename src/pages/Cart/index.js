import React, { useMemo } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {
  Alert,
} from "@material-ui/core";
import { useCart } from "../../hooks/useCart";
import { FormatPrice } from "../../utils/Functions/FormatPrice";
import { Container, ProductTable, Total, Content, ActionsBtns } from "./styles";
import { api } from "../../services/api";
import ModalPao from "../../components/ModalPao";
import { GetLocalDate } from "../../utils/Functions/GetLocalDate";

const Cart = () => {
  const { cart, setCart, removeProduct, updateProductAmount } = useCart();
  const [period, setPeriod] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  const cartFormatted = useMemo(
    () =>
      cart.map((product) => ({
        ...product,
        priceFormatted: FormatPrice(product.price),
        subTotal: FormatPrice(product.price * product.amount),
      })),
    [cart]
  );

  const itemsFormatted = useMemo(
    () =>
      cart.map((product) => ({
        quantity: product.amount,
        price: +product.price,
        subtotal: product.price * product.amount,
        product_id: product.id,
      })),
    [cart]
  );

  const total = useMemo(
    () =>
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0),
    [cart]
  );

  function handleProductIncrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId) {
    removeProduct(productId);
  }

  async function handlePurchase() {
    const purchase = {
      purchase_datetime: GetLocalDate(),
      amount: total,
      items: itemsFormatted,
      period: period
    }
    console.log(purchase);
    return

    await api.post("purchase-orders", purchase)
      .then(() => {
        setPeriod("")
        setCart([])
        handleClose()
      })
      .catch(err => console.error(err))
  }

  function handlePeriodSelected(ev) {
    setPeriod(ev.target.value)
  }


  return (
    <Container>
      <Content>
        <Alert severity="info">
          Para entregas pela <strong>MANHÃ</strong> os pedidos devem ser realizados até <strong>23:00</strong> do dia anterior.<br />
          Para entregas no final da <strong>TARDE</strong> os pedidos devem ser realizados até <strong>13:00</strong> do mesmo dia.
        </Alert>
        <ActionsBtns>
          <div>
            <select
              id="padaria"
              value={period}
              onChange={handlePeriodSelected}
              style={{ marginRight: "5px", padding: "5px 10px 9px 10px" }}
            >
              <option value="" disabled>Selecione o período</option>
              <option value="0">Manhã</option>
              <option value="1">Tarde</option>
            </select>
            <button
              disabled={period !== "" && cart.length > 0 ? false : true}
              onClick={handleOpen}
            >
              Finalizar pedido
            </button>
          </div>
          <Total>
            <span>TOTAL</span>
            <strong>{FormatPrice(total)}</strong>
          </Total>
        </ActionsBtns>
        <ProductTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Unidade</th>
              <th>Valor Unitário</th>
              <th>Subtotal</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cartFormatted.map((product) => (
              <tr key={product.id} data-testid="product">
                <td>
                  {product.name}
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount === 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      value={product.amount}
                      readOnly
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>Grama</td>
                <td>{product.priceFormatted}</td>
                <td>{product.subTotal}</td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Content>
      <ModalPao
        handleClose={handleClose}
        modalIsOpen={modalIsOpen}
        handlePurchase={handlePurchase}
      />
    </Container>
  );
};

export default Cart;