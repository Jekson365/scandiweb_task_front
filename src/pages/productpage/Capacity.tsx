import { CurrentProduct, Item } from "../../types/types";
import useAttrSelector from "../../helpers/useAttrSelector";

const Capacity = ({ attr }: { attr: CurrentProduct }) => {
  const { handleSelect } = useAttrSelector({
    attr: attr,
    selector: "Capacity",
  });
  return (
    <>
      <div className="row sizes">
        <>
          <div className="title">capacity</div>
          <div
            className="sizes-container"
            data-testid={`product-attribute-${attr.id_name.toLocaleLowerCase()}`}
          >
            {attr.items.map((item: Item) => {
              return (
                <>
                  <div
                    data-testid={`product-attribute-capacity-${item.id_name}`}
                    className={`size ${
                      item.isSelected ? "selected-capacity" : ""
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.value}
                  </div>
                </>
              );
            })}
          </div>
        </>
      </div>
    </>
  );
};

export default Capacity;
