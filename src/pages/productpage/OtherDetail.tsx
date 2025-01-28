import { useContext } from "react";
import { Attribute, CurrentProduct, Item } from "../../types/types";
import { CartContext } from "./Productpage";

const OtherDetail = ({ attr }: { attr: CurrentProduct }) => {
  const { cartObject, setCartObject } = useContext(CartContext);

  const handleSelect = (item: Item) => {
    const updatedAttributes = cartObject.attributes.map(
      (attribute: Attribute) => {
        const isExcludedAttribute =
          attribute.id_name === "Capacity" ||
          attribute.id_name === "Size" ||
          attribute.id_name === "Color";

        if (attribute.id !== attr.id || isExcludedAttribute) {
          return attribute;
        }

        const updatedItems = attribute.items.map((i: Item) =>
          attr.id_name === attribute.id_name
            ? { ...i, isSelected: i.id === item.id ? !i.isSelected : false }
            : i
        );

        return { ...attribute, items: updatedItems };
      }
    );

    setCartObject({ ...cartObject, attributes: updatedAttributes });
  };

  return (
    <>
      <div className="row">
        {attr.id_name}
        <div
          className="radios"
          style={{ display: "flex", gap: "10px" }}
          data-testid={`product-attribute-${attr.id_name}`}
        >
          {attr.items.map((item: Item) => {
            return (
              <>
                <div
                  data-testid={`product-attribute-${item.id_name}`}
                  onClick={() => handleSelect(item)}
                  className={`radio-box ${
                    item.isSelected ? "selected-radio-box" : null
                  }`}
                >
                  <div>{item.value}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OtherDetail;
