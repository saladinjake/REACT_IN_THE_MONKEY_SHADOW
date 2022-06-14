import { Layout, ProductsTableSection } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Products", "Description");

const ProductsPage = () => {
  return (
    <Layout SEO={pageSEO} pageHeader="products" page="products">
      <ProductsTableSection />
    </Layout>
  );
};

export default ProductsPage;
