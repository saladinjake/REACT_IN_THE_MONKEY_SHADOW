import { Layout } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "About",
  "Unlike all E-commerce platforms ..."
);

const AboutPage = () => {
  return <Layout SEO={pageSEO}>About page</Layout>;
};

export default AboutPage;
