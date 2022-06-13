import { Layout } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Store Location",
  " Unlike all E-commerce platforms ..."
);

const AboutPage = () => {
  return <Layout SEO={pageSEO}>
    <p>An outline of the company's store locations</p>
  </Layout>;
};

export default AboutPage;
