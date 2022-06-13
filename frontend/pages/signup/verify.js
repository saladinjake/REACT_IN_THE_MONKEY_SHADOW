import { Layout, Section, EmailSuccess } from "components/components/pages";
import { Box } from "@chakra-ui/react";
import buildSEO from "utils/buildSEO";
import { useRouter } from "next/router";
import { Button, Link } from "components/components/shared/lib";
import { AiOutlineRight } from "react-icons/ai";

const pageSEO = buildSEO(
  "Verify Signup",
  "Verify your account after signup ..."
);

const Wrapper = ({ children }) => (
  <Section px={6} py={20} pb="195px">
    <Box
      maxW="450px"
      mx="auto"
      borderRadius="0.5rem"
      border="1px"
      borderColor="brand.gray5"
      bg="brand.white"
      p={5}
      position="relative"
    >
      {children}
    </Box>
  </Section>
);

const SignupVerifyPage = () => {
  const router = useRouter();

  const emailAddress = router.query.email;

  return (
    <Layout SEO={pageSEO}>
      <Wrapper>
        <EmailSuccess emailAddress={emailAddress} />

        <Box textAlign="right">
          <Link mute href="/signin">
            <Button sm variant="primary" rightIcon={<AiOutlineRight />}>
              Continue to Signin
            </Button>
          </Link>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default SignupVerifyPage;
