import PageTitle from "../../components/headers/PageTitle";
import { useCartContext } from "../../components/providers/CartProvider";
import ProductList from "./ProductList";

export const Homepage = () => {
  const { lastSegment } = useCartContext()!;
  return (
    <>
      <div className="gap"></div>
      <PageTitle title={lastSegment} />
      <ProductList />
    </>
  );
};
