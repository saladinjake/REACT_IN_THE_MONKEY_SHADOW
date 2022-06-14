import { Layout, OrdersTableSection } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Order", "Description");

const OrdersPage = () => {
  return (
    <Layout SEO={pageSEO} page="orders">
      <OrdersTableSection />
    </Layout>
  );
};

export default OrdersPage;
