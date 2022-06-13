import {
  Layout,
  Form,
  Loader,
  SomethingWentWrong,
  Section,
} from "components/components/pages";
import { Box, Flex } from "@chakra-ui/react";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { Text, Link, Heading, Button, Icon } from "components/lib";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import cookie from "utils/cookie";
import useAuth from "hooks/useAuth";

const pageSEO = buildSEO(
  "Confirm Verification",
  "Confirm your account verification..."
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

const ConfirmVerificationPage = () => {
  const router = useRouter();
  const auth = useAuth();

  const [feedback, setFeedback] = useState({});

  const handleVerify = async () => {
    setFeedback({ loading: true });

    try {
      await http.post(`/auth/verification?token=${router.query.token}`);

      setFeedback({ success: true });
    } catch (err) {
      setFeedback({
        error: err,
      });
    }
  };

  const handleErrorRetry = () => {
    if (feedback.error.network) {
      handleErrorRetry();
    } else {
      router.replace("/verify-account");
    }
  };

  useEffect(() => {
    if (feedback.success) {
      auth.signout(false);

      const id = setTimeout(() => {
        router.replace("/signin");
      }, 2000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [feedback.success]);

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <Layout SEO={pageSEO}>
      <Wrapper>
        {feedback.loading && <Loader h="100px" />}
        {feedback.error && (
          <SomethingWentWrong
            h="auto"
            message={feedback.error.message}
            onRetry={handleErrorRetry}
          />
        )}
        {feedback.success && (
          <Flex flexDir="column" alignItems="center" textAlign="center">
            <Icon fontSize="200%">
              <IoIosCheckmarkCircleOutline />
            </Icon>

            <Heading type="h5">
              You have successfully verified your account
            </Heading>
          </Flex>
        )}
      </Wrapper>
    </Layout>
  );
};

export default ConfirmVerificationPage;
