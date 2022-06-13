import { Layout, SomethingWentWrong } from "components/components/pages";
import { useRouter } from "next/router";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Server Error",
  "An internal serval error occurred..."
);

const ServerError = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.reload();
  };

  return (
    <Layout SEO={pageSEO}>
      <SomethingWentWrong h="65vh" onRetry={handleRetry} />
    </Layout>
  );
};

export default ServerError;
