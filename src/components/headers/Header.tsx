import "../../styles/components.scss";
import centerIcon from "../../../assets/a-logo.png";
import cartIcon from "../../../assets/Empty Cart.png";
import { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import { useCartContext } from "../providers/CartProvider";

export const Header = () => {
  const { cartQuantity } = useCartContext()!;
  const { open, setOpen } = useCartContext()!;
  const [location, setLocation] = useState<string | undefined>("");
  const path = window.location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();

  useEffect(() => {
    setLocation(lastSegment);
  }, []);
  return (
    <>
      <div className="header">
        <div className="nav-items">
          <div className="col col-1">
            <div className="items">
              <a
                href="/clothes"
                data-testid={
                  location === "clothes"
                    ? "active-category-link"
                    : "category-link"
                }
                className={location === "clothes" ? "selected-page" : ""}
              >
                Clothes
              </a>
              <a
                href="/tech"
                data-testid={
                  location === "tech" ? "active-category-link" : "category-link"
                }
                className={location === "tech" ? "selected-page" : ""}
              >
                Tech
              </a>
              <a
                href="/all"
                data-testid={
                  location === "all" ? "active-category-link" : "category-link"
                }
                className={location === "all" ? "selected-page" : ""}
              >
                All
              </a>
            </div>
          </div>
          <div className="col col-2">
            <img src={centerIcon} />
          </div>
          <div className="col col-3 p-r">
            <Cart open={open} />
            <img
              src={cartIcon}
              data-testid='cart-btn'
              onClick={() => setOpen(!open)}
            />
            {cartQuantity > 0 ? (
              <>
                <div className="counter" data-testid="cart-total" >{cartQuantity}</div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
