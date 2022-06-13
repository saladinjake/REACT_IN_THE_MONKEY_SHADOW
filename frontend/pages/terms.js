import { Layout } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Privacy Policy",
  "This  is a military weapon store."
);

const PrivacyPolicyPage = () => {
  return <Layout SEO={pageSEO}>
    <p>This should contain legal/policy-related content</p>
  </Layout>;
};

export default PrivacyPolicyPage;
