import { createContext, ReactNode, useContext, useState } from "react";
import { useCart } from "react-use-cart";
import { CurrentProduct } from "../../types/types";

interface CartContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CurrentProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<CurrentProduct[]>>;
  cartQuantity: number;
  lastSegment: string | undefined;
}

const CartState = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { totalItems, items }: any = useCart();
  const path = window.location.pathname;
  const lastSegment = path.split("/").filter(Boolean).pop();

  const [open, setOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CurrentProduct[]>(items);

  return (
    <CartState.Provider
      value={{
        open,
        setOpen,
        setCartItems,
        cartItems,
        cartQuantity: totalItems,
        lastSegment,
      }}
    >
      {children}
    </CartState.Provider>
  );
};

export const useCartContext = () => useContext(CartState);
