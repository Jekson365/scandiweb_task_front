import { ProductCardProps } from "../../interfaces/interfaces";
import CartIcon from "../../../assets/Empty Cart.png";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import { Attribute, Item } from "../../types/types";
import uuid from "react-uuid";
import { useCartContext } from "../providers/CartProvider";

const ProductCard = ({ item }: ProductCardProps) => {
  const { setOpen } = useCartContext()!;
  const { updateItemQuantity, items, addItem } = useCart();
  const [cartObject, setCartObject] = useState<any>({
    id: null,
    name: "",
    price: "",
    inStock: false,
    uniq_id: null,
    attributes: [],
    gallery: [],
  });
  useEffect(() => {
    if (item && item.attributes) {
      const { name, price, id, attributes, gallery, inStock } = item;

      const transformedAttributes = attributes.map((attribute: Attribute) => ({
        ...attribute,
        items: attribute.items.map((currentItem: Item, index: number) => ({
          ...currentItem,
          isSelected: index === 0,
        })),
      }));

      setCartObject({
        uniq_id: id,
        name: name,
        price: price,
        inStock: inStock,
        attributes: transformedAttributes,
        gallery: gallery,
      });
    }
  }, [item]);
  const handleCart = () => {
    if (cartObject.inStock) {
      let itemsExits = false;
      setOpen(true);
      
      items.forEach((e: any) => {
        if (
          JSON.stringify(e.attributes) == JSON.stringify(cartObject.attributes)
        ) {
          updateItemQuantity(e.id, e.quantity + 1);
          itemsExits = true;
        }
      });
      
      if (!itemsExits) {
        addItem({ ...cartObject, id: uuid() });
      }
    }
  };
  return (
    <>
      <div className="product-card" data-testid={`product-${item.id_name}`}>
        {!item.inStock ? (
          <>
            <div className="out-of-stock">out of stock</div>
          </>
        ) : null}
        {item.inStock ? (
          <>
            <div className="add-cart-button" onClick={handleCart}>
              <img src={CartIcon} />
            </div>
          </>
        ) : null}
        <Link to={`/product/${item.id}`}>
          <div
            className={`image-cover ${item.inStock ? "" : "out-stock-image"}`}
            style={{
              backgroundImage: `url('${item.gallery[0]}')`,
            }}
          ></div>
        </Link>
        <h3 className="title" style={{ marginTop: "40px" }}>
          {item.name}
        </h3>
        <p className="price">{item.price.amount}$</p>
      </div>
    </>
  );
};

export default ProductCard;
