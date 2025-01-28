import { CurrentProduct, Item } from "../../types/types";
import useAttrSelector from "../../helpers/useAttrSelector";

const Color = ({ attr }: { attr: CurrentProduct }) => {
  const { handleSelect } = useAttrSelector({ attr: attr, selector: "Color" });
  return (
    <>
      <div className="row colors">
        <div className="title">Color:</div>
        <div
          className="colors-container"
          data-testid={`product-attribute-${attr.id_name.toLocaleLowerCase()}`}
        >
          {attr.items.map((item: Item) => {
            return (
              <div
                data-testid={`product-attribute-color-${item.id_name}`}
                className={`color c-1 ${
                  item.isSelected ? "selected-color" : ""
                }`}
                onClick={() => handleSelect(item)}
                style={{ backgroundColor: item.value }}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Color;
