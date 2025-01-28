import { Attribute, CurrentProduct, Item } from "../../types/types";
import "../../styles/productpage.scss";
import { useQuery } from "@apollo/client";
import ReactHtmlParser from "html-react-parser";

import { GET_PROD_BY_CAT } from "../../graphql/queries/productQueires";
import Size from "./Size";
import Color from "./Color";
import Capacity from "./Capacity";
import OtherDetail from "./OtherDetail";
import { createContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import uuid from "react-uuid";
import ProductImages from "./ProductImages";

export const CartContext = createContext<any>({});

const Productpage = () => {
  const path = window.location.pathname;
  const prodId = path.split("/").filter(Boolean).pop();
  const { addItem, items, updateItemQuantity } = useCart();
  const [validProps, setValidProps] = useState(false);
  const [cartObject, setCartObject] = useState<any>({
    id: null,
    name: "",
    price: "",
    description: "",
    inStock: null,
    uniq_id: null,
    attributes: [],
    gallery: [],
  });
  const { loading, error, data } = useQuery(GET_PROD_BY_CAT, {
    variables: { id: prodId, cat: "" },
  });

  useEffect(() => {
    if (data?.productsByCat) {
      const { name, price, id, attributes, gallery, inStock, description } =
        data.productsByCat[0];

      const transformedAttributes = attributes.map((attribute: Attribute) => ({
        ...attribute,
        items: attribute.items.map((item: Item) => ({
          ...item,
          isSelected: false,
        })),
      }));
      setCartObject({
        uniq_id: id,
        name: name,
        price: price,
        description: description,
        inStock: inStock,
        attributes: transformedAttributes,
        gallery: gallery,
      });
    }
  }, [data]);

  useEffect(() => {
    const allFilled = cartObject.attributes.every((attribute: Attribute) => {
      const selectedItems = attribute.items.filter((item) => item.isSelected);
      return selectedItems.length > 0;
    });
    setValidProps(allFilled);
  }, [cartObject.attributes]);

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>somethin went wrong!</>;
  }
  const handleCartItems = () => {
    if (validProps) {
      let itemExists = false;
      items.forEach((e: any) => {
        if (
          JSON.stringify(e.attributes) === JSON.stringify(cartObject.attributes)
        ) {
          updateItemQuantity(e.id, e.quantity + 1);
          itemExists = true;
        }
      });
      if (!itemExists) {
        addItem({ ...cartObject, id: uuid() });
      }
    }
  };

  return (
    <>
      <div
        className="product-page-container"
        style={{ transform: "translateY(0px)" }}
      >
        <ProductImages product={data.productsByCat[0]} />
        <CartContext.Provider value={{ cartObject, setCartObject }}>
          <div className="col col-2">
            <div className="col-2-inner-cover">
              <div className="row price">
                <div className="title">{cartObject.name}</div>
              </div>
              <div
                className="product-content"
                style={{ gap: "10px !important" }}
              >
                {!cartObject.inStock ? (
                  <>
                    <div className="row">
                      <div className="out-of-stock-fixed">out of stock</div>
                    </div>
                  </>
                ) : null}
                {cartObject.attributes.map((attr: CurrentProduct) => {
                  return (
                    <>
                      {attr.id_name === "Size" ? (
                        <>
                          <Size attr={attr} />
                        </>
                      ) : attr.id_name === "Color" ? (
                        <>
                          <Color attr={attr} />
                        </>
                      ) : attr.id_name === "Capacity" ? (
                        <>
                          <Capacity attr={attr} />
                        </>
                      ) : attr.id_name !== "" ? (
                        <>
                          <OtherDetail attr={attr} />
                        </>
                      ) : null}
                    </>
                  );
                })}
                <div className="row price">
                  <div className="title">Price</div>
                  <div className="title">{cartObject.price.amount}$</div>
                </div>
                <div className="description">
                  {cartObject.inStock ? (
                    <>
                      <button
                        className={`custom-button ${
                          !validProps ? "add-cart-gray" : ""
                        }`}
                        disabled={validProps ? false : true}
                        data-testid="add-to-cart"
                        onClick={handleCartItems}
                      >
                        Add to cart
                      </button>
                    </>
                  ) : null}
                  <div className="desc" data-testid="product-description">
                    {ReactHtmlParser(
                      cartObject.description.replace(/\\n/g, "")
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CartContext.Provider>
      </div>
    </>
  );
};

export default Productpage;
