import { Layout, Form } from "components/pages";
import { Flex } from "@chakra-ui/react";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { Text, Link } from "components/lib";

const pageSEO = buildSEO(
  "Reset Password",
  "Gain lot of access to our platform by simply Signing up with your credentials"
);

const initialFieldsProps = [
  {
    id: "password",
    label: "New password",
    placeholder: "Enter your New Password",
    type: "password",
  },
  {
    id: "confirmPassword",
    label: "Confirm new password",
    placeholder: "Confirm your New Password",
    type: "password",
  },
];

const handleFormSubmit = async (fieldsObj, router) => {
  const body = {
    ...fieldsObj,
    resetToken: router.query.token,
  };

  await http.post("/auth/reset-password", body);

  console.log("resetting password...");

  // redirect to `/signin` page
  return "/signin";
};

const PasswordResetPage = () => {
  const form = useForm({ handleFormSubmit, initialFieldsProps });

  return (
    <Layout SEO={pageSEO}>
      <Form
        formData={form}
        toast={{
          description: "We've successfully reset your password.",
        }}
        headerText="Reset your password"
        footerContent={
          <Flex  boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)" alignItems="flex-end" justifyContent="space-between">
            <Flex>
              <Text color="brand.gray3" m={0} mr={2}>
                I can't reset my password?
              </Text>

              <Link href="/forgot-password" color="brand.primary">
                Restart
              </Link>
            </Flex>

            {form.renderSubmitBtn({
              text: "Reset Password",
              loadingText: "resetting your password",
              variant: "primary",
            })}
          </Flex>
        }
      />
    </Layout>
  );
};

export default PasswordResetPage;
