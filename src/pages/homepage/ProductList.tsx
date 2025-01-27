import ProductCard from "../../components/cards/ProductCard";
import { Product } from "../../types/types";
import { useQuery } from "@apollo/client";
import {
  GET_PROD_BY_CAT,
} from "../../graphql/queries/productQueires";

function ProductList() {
  const path = window.location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();

  const { loading, data } = useQuery(GET_PROD_BY_CAT,{
    variables: { cat: lastSegment }
  });
  return (
    <>
      <div className="product-list-cover">
        {loading ? (
        <>loading...</>
        ) : (
          <>
            {data &&
              data.productsByCat.map((e: Product) => {
                return (
                  <>
                    <ProductCard item={e} />
                  </>
                );
              })}
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
