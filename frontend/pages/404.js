import { Layout, SomethingWentWrong } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Page not found", "This page is not found...");

const NotFoundPage = () => {
  return (
    <Layout SEO={pageSEO}>
      <SomethingWentWrong h="65vh" message="Page not found" />
    </Layout>
  );
};

export default NotFoundPage;
