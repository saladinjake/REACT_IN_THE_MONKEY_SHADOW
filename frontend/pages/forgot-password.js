import {
  Layout,
  Form,
  EmailError,
  EmailLoader,
  Section,
  EmailSuccess,
} from "components/components/pages";
import { Link, Text } from "components/shared/lib";
import { Box, Flex } from "@chakra-ui/react";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { useRouter } from "next/router";
import { useState } from "react";

const pageSEO = buildSEO(
  "Forgot Password",
  "Gain lot of access to our platform by simply Signing up with your credentials"
);

const initialFieldsProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "email",
  },
];

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

const ForgotPasswordPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (fieldsObj) => {
    await http.post("/auth/forgot-password", fieldsObj);

    setEmailAddress(fieldsObj.email);
    // Check for refCode in the query string
    // if available Add the the req.body
  };

  const form = useForm({ handleFormSubmit, initialFieldsProps });

  const handleRetry = () => {
    router.reload();
  };

  return (
    <Layout SEO={pageSEO}>
      {/* Loading state */}
      {form.formSubmitState.isSubmitting ? (
        <Wrapper>
          <EmailLoader />
        </Wrapper>
      ) : // Error state
      form.formSubmitState.hasSubmitError ? (
        <Wrapper>
          <EmailError
            onRetry={handleRetry}
            message={form.formSubmitState.hasSubmitError}
          />
        </Wrapper>
      ) : // Success state
      form.formSubmitState.hasSubmitted ? (
        <Wrapper>
          <EmailSuccess emailAddress={emailAddress} />
        </Wrapper>
      ) : (
        // Neutral state
        <Form
          formData={form}
          toast={{
            title: "Email sent.",
            description: "We've sent you an email.",
          }}
          headerText="Forgot your password?"
          desc={
            <Text mt={7}>
              Please provide us your email used to Registering to our platform,
              down below.
            </Text>
          }
          footerContent={
            <Flex  boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)" alignItems="flex-end" justifyContent="space-between">
              <Flex>
                <Text color="brand.gray3" m={0} mr={2}>
                  I remember my password
                </Text>

                <Link href="/signin">
                  <Text color="brand.primary" m={0}>
                    Sign in
                  </Text>
                </Link>
              </Flex>

              {form.renderSubmitBtn({
                text: "Send",
                variant: "primary",
              })}
            </Flex>
          }
        />
      )}
    </Layout>
  );
};

export default ForgotPasswordPage;
