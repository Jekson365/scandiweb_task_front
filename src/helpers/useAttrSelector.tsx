import { useContext } from "react";
import { CartContext } from "../pages/productpage/Productpage";
import { Attribute, CurrentProduct, Item } from "../types/types";

type Props = {
  attr: CurrentProduct;
  selector: string;
};

const useAttrSelector = ({ attr, selector }: Props) => {
  const { cartObject, setCartObject } = useContext(CartContext);

  const handleSelect = (item: Item) => {
    const updatedAttributes = cartObject.attributes.map(
      (attribute: Attribute) => {
        if (attribute.id === attr.id && attribute.id_name === selector) {
          const updatedItems = attribute.items.map((i: Item) => {
            return { ...i, isSelected: i.id_name === item.id_name };
          });
          return { ...attribute, items: updatedItems };
        }
        return attribute;
      }
    );

    setCartObject({ ...cartObject, attributes: updatedAttributes });
  };

  return { handleSelect };
};

export default useAttrSelector;
