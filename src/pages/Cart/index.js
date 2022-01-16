import React, { useMemo } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import {
  Button,
} from "@material-ui/core";
import { useCart } from "../../hooks/useCart";
import { FormatPrice } from "../../utils/Functions/FormatPrice";
import { Container, ProductTable, Total, Content } from "./styles";
import DialogCart from "../../components/DialogCart"
import { api } from "../../services/api";

const Cart = () => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [modalOpen, setModalOpen] = React.useState(false);

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

  async function handlePurchase(period) {
    const purchase = {
      purchase_datetime: new Date(),
      amount: total,
      items: itemsFormatted,
      period: period
    }

    const res = await api.post("purchase-orders", purchase)
    console.log(res);
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  function handleModalConfirm(period) {
    handlePurchase(period);
    handleModalClose();
  }

  return (
    <Container>
      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cartFormatted.map((product) => (
              <tr key={product.id} data-testid="product">
                <td>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
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
                      readOnly
                      value={product.amount}
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
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
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

        <footer>
          <button type="button" onClick={handleModalOpen} >Finalizar pedido</button>
          <Total>
            <span>TOTAL</span>
            <strong>{FormatPrice(total)}</strong>
          </Total>
        </footer>
      </Content>

      <DialogCart open={modalOpen}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleModalConfirm(0)}
          style={{ marginRight: "5px" }}
        >
          Manhã
        </Button>
        <Button type="submit" variant="contained" onClick={() => handleModalConfirm(1)}>
          Tarde
        </Button>
      </DialogCart>

    </Container>
  );
};

export default Cart;