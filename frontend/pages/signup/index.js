import { Layout, Form } from "components/components/pages";
import { Link, Text } from "components/shared/lib";
import { Flex } from "@chakra-ui/react";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
// import axios from "axios";

const pageSEO = buildSEO(
  "Sign up",
  "Gain lot of access to our platform by simply Signing up with your credentials"
);

const initialFieldsProps = [
  {
    id: "firstName",
    label: "First name",
    placeholder: "First name",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "Last name",
  },
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
  {
    id: "confirmPassword",
    label: "Confirm password",
    placeholder: "Confirm your password",
    type: "password",
  },
];

const handleFormSubmit = async (fieldsObj, router) => {
  // compose the body data - Check for refCode in the query string
  const body = { ...fieldsObj, refCode: router.query.ref };

  // Request signup
  await http.post("/auth/signup", body);

  // redirect to `/signin` page
  return `/signup/verify?email=${fieldsObj.email}`;
};

const SignupPage = () => {
  const form = useForm({ handleFormSubmit, initialFieldsProps });

  return (
    <Layout SEO={pageSEO}>
      <Form
        formData={form}
        toast={{
          title: "Account created.",
          description: "We've created your account for you.",
        }}
        headerText="Create your account"
        footerContent={
          <Flex  boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)" alignItems="flex-end" justifyContent="space-between">
            <Flex>
              <Text color="brand.gray3" m={0} mr={2}>
                I already have an account
              </Text>

              <Link href="/signin">
                <Text color="brand.primary" m={0}>
                  Sign in
                </Text>
              </Link>
            </Flex>

            {form.renderSubmitBtn({
              text: "Sign up",
              variant: "primary",
            })}
          </Flex>
        }
      />
    </Layout>
  );
};

export default SignupPage;
