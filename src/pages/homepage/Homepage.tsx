import PageTitle from "../../components/headers/PageTitle";
import ProductList from "./ProductList";

export const Homepage = () => {
  const path = window.location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();

  return (
    <>
      <div className="gap"></div>
      <PageTitle title={lastSegment} />
      <ProductList />
    </>
  );
};
