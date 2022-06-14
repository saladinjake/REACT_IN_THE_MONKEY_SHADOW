import { Layout, CategoriesTableSection } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Categories", "Description");

const CategoriesPage = () => {
  return (
    <Layout SEO={pageSEO} pageHeader="categories" page="categories">
      <CategoriesTableSection />
    </Layout>
  );
};

export default CategoriesPage;
