import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem('@PaoNaCaixa:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = (item) => {
    const updatedCart = [...cart];
    const productExists = updatedCart.find(
      product => product.id === item.id
    );

    const currentAmount = productExists ? productExists.amount : 0;
    const amount = currentAmount + 1;

    if (productExists) {
      productExists.amount = amount;
    } else {
      const newProduct = {
        ...item,
        amount: 1,
      };
      updatedCart.push(newProduct);
    }

    setCart(updatedCart);
    localStorage.setItem('@PaoNaCaixa:cart', JSON.stringify(updatedCart));
  };

  const removeProduct = (product) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        prod => prod.id === product.id
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('@PaoNaCaixa:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }) => {
    try {
      if (amount <= 0) {
        return;
      }

      const updatedCart = [...cart];
      const searchedProduct = updatedCart.find(
        product => product.id === productId
      );

      if (searchedProduct) {
        searchedProduct.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@PaoNaCaixa:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}