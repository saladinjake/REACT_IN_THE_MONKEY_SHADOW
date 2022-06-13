import { Layout, PageNotFound } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "404 page not found",
  "This page is not present on the website..."
);

const Custom404Page = () => {
  return (
    <Layout SEO={pageSEO} page="not-found">
      <PageNotFound />
    </Layout>
  );
};

export default Custom404Page;
