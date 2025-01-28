import { CurrentProduct, Item } from "../../types/types";
import useAttrSelector from "../../helpers/useAttrSelector";

const Size = ({ attr }: { attr: CurrentProduct }) => {
  const { handleSelect } = useAttrSelector({ attr: attr, selector: "Size" });
  return (
    <>
      <div className="row sizes">
        <div className="title">Size:</div>
        <div
          className="sizes-container"
          data-testid={`product-attribute-${attr.id_name.toLocaleLowerCase()}`}
        >
          {attr.items.map((item: Item) => {
            return (
              <>
                <div
                  data-testid={`product-attribute-size-${item.id_name}`}
                  className={`size ${item.isSelected ? "selected-size" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  {item.value}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Size;
