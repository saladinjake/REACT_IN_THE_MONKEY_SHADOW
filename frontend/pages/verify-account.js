import {
  Layout,
  Form,
  EmailError,
  EmailLoader,
  Section,
  EmailSuccess,
  Loader,
} from "components/components/pages";
import { Link, Text } from "components/shared/lib";
import { Box, Flex } from "@chakra-ui/react";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";

const pageSEO = buildSEO("Verify Account", "Manually Verify your account...");

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

const EmailComponent = ({ emailAddress }) => {
  const router = useRouter();

  const doSubmit = async (fieldsObj) => {
    await http.post(`/auth/verification/resend?email=${fieldsObj.email}`);
  };

  const initialFieldsProps = [
    {
      id: "email",
      label: "Email",
      placeholder: "Enter your email...",
      type: "email",
      value: emailAddress,
      mute: true,
    },
  ];

  const form = useForm({ doSubmit, initialFieldsProps });

  const handleRetry = () => {
    router.reload();
  };

  return (
    //  Loading state
    form.formSubmitState.isSubmitting ? (
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
        stayAuthenticated
        formData={form}
        toast={{
          title: "Email sent.",
          description: "We've sent you an email.",
        }}
        headerText="Verify your account"
        footerContent={
          <Box>
            {form.renderSubmitBtn({
              text: "Send Email",
              variant: "primary",
              w: "100%",
            })}
          </Box>
        }
      />
    )
  );
};

const VerifyAccountPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      setEmailAddress(auth.currentUser?.email);
    } else {
      router.replace("/store");
    }
  }, [auth.currentUser]);

  return (
    <Layout SEO={pageSEO}>
      {emailAddress ? (
        <EmailComponent emailAddress={emailAddress} />
      ) : (
        <Wrapper>
          <Loader h="100%" message="please wait..." />
        </Wrapper>
      )}
    </Layout>
  );
};

export default VerifyAccountPage;
