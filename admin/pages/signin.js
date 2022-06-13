import { useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import { Heading, TextField } from "components/lib";
import http from "utils/http";
import cookie from "utils/cookie";
import useForm from "hooks/useForm";
import useAuth from "hooks/useAuth";
import useFormSubmitFeedback from "hooks/useFormSubmitFeedback";

const initialFieldsProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
];

const SignInPage = () => {
  const doSubmit = async (fieldsObj) => {
    // request a login
    const {
      data: {
        data: { token, role },
      },
    } = await http.post("/auth/signin", fieldsObj);

    // Validation check
    // TODO: validate for admin users
    if (role !== "admin") {
      throw new Error("Invalid email or password");
    }

    // persist token to cookie
    cookie.setToken(token);

    // redirect to `<redirectPath>` by returning the `<redirectPath>`
    return "/auth-check";
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  return (
    <Grid placeItems="center" h="100vh" p={2}>
      <Form
        formData={form}
        toast={"You've successfully Signed in."}
        headerText="Admin portal"
        footerContent={
          <>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Flex alignItems="center" mb={{ base: 5, md: 0 }}>
                <input type="checkbox" id="remember-me" />
                <Text as="label" htmlFor="remember-me" m={0} ml={2}>
                  Remember me
                </Text>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" alignItems="flex-end">
              {form.renderSubmitBtn({
                text: "Sign in",
                variant: "primary",
                flex: 1,
              })}
            </Flex>
          </>
        }
      />
    </Grid>
  );
};

const Form = ({
  formData,
  children,
  headerText,
  footerContent,
  toast: successText,
}) => {
  const auth = useAuth();

  // All pages using the component will `sign the user out`? if the user is signed-in already
  useEffect(() => {
    if (cookie.getToken()) {
      auth.signout();
    }
  }, []);

  useFormSubmitFeedback({
    formSubmitState: formData.formSubmitState,
    successText,
  });

  return (
    <Box
      borderRadius="0.5rem"
      border="1px"
      borderColor="brand.gray5"
      bg="brand.white"
      p={{ base: 2, md: 5 }}
      position="relative"
      top={-20}
    >
      <Box as="header" flexWrap="wrap" textAlign="center" mb={5}>
        <Heading type="h4" as="h1" color="brand.primary">
          {headerText}
        </Heading>
      </Box>

      <Box
        as="form"
        w={{ base: "300px", md: "400px" }}
        mt={8}
        {...formData.formProps}
      >
        {children ? (
          children
        ) : (
          <>
            {formData.fieldsProps.map((field) => (
              <TextField
                key={field.id}
                onChange={formData.handleType}
                {...field}
              />
            ))}
          </>
        )}

        <Box
          as="footer"
          position="absolute"
          bottom={0}
          transform="translateY(calc(100% + 20px))"
          left={0}
          w="100%"
        >
          {footerContent}
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
