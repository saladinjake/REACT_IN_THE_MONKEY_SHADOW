import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Avatar, Heading, TextField } from "components/shared/lib";
import { AccountAuth, Layout, PageHeader, Section } from "components/components/pages";
import useAuth from "hooks/useAuth";
import useForm from "hooks/useForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsGear } from "react-icons/bs";
import breakpoints from "theme/breakpoints";
import buildSEO from "utils/buildSEO";
import http from "utils/http";

const pageSEO = buildSEO("Edit Profile", "...");

const MiniSection = ({ children, p, pt, ...rest }) => (
  <Section maxW={breakpoints.md} {...rest}>
    <Box p={p} pt={pt} mb={0} pos="relative">
      {children}
    </Box>
  </Section>
);

const Form = ({
  doSubmit,
  initialFieldsProps,
  successToast = "Successfully updated.",
  submitBtnText,
}) => {
  const {
    formProps,
    handleType,
    fieldsProps,
    renderSubmitBtn,
    formSubmitState,
  } = useForm({ doSubmit, initialFieldsProps });
  const toast = useToast();

  useEffect(() => {
    if (formSubmitState.hasSubmitError) {
      toast({
        description: formSubmitState.hasSubmitError,
        status: "error",
        duration: 3 * 1000,
        position: "top",
      });
    }

    if (formSubmitState.hasSubmitted) {
      toast({
        description: successToast,
        status: "success",
        duration: 3 * 1000,
        position: "top",
      });
    }
  }, [
    formSubmitState.hasSubmitted,
    formSubmitState.hasSubmitError,
    successToast,
  ]);

  return (
    <Box as="form" {...formProps}>
      <Box
        py={5}
        bg="brand.white"
        rounded="md"
        mb={5}
        p={{ base: 2, md: 5 }}
        shadow="lg"
      >
        {fieldsProps.map((field) => (
          <TextField key={field.id} {...field} onChange={handleType} />
        ))}
      </Box>

      <Flex justifyContent="flex-end">
        {renderSubmitBtn({
          text: submitBtnText,
          variant: "primary",
          sm: true,
          leftIcon: <BsGear />,
        })}
      </Flex>
    </Box>
  );
};

const ProfileSettingPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const { currentUser } = auth;

  const forms = {
    personalInfo: {
      formFields: [
        {
          id: "firstName",
          label: "First name",
          value: currentUser?.firstName,
        },
        {
          id: "lastName",
          label: "Last name",
          value: currentUser?.lastName,
        },
        {
          id: "email",
          label: "Email",
          value: currentUser?.email,
          mute: true,
        },
      ],
      doSubmit: async (fieldsObj) => {
        await http.patch("/me", fieldsObj);

        setTimeout(() => {
          auth.persistUserToClient(true);
        }, 300);
      },
    },

    password: {
      formFields: [
        {
          id: "currentPassword",
          label: "Current Password",
          type: "password",
        },
        {
          id: "newPassword",
          label: "New Password",
          type: "password",
        },
        {
          id: "confirmPassword",
          label: "Confirm Password",
          type: "password",
        },
      ],
      doSubmit: async (fieldsObj) => {
        await http.post("/auth/change-password", fieldsObj);

        setTimeout(() => {
          router.reload();
        }, 1000);
      },
    },
  };

  return (
    <Layout SEO={pageSEO}>
      <PageHeader>Edit Account</PageHeader>

      {auth.isAuthenticated ? (
        <>
          <MiniSection mt={10} p={{ base: 4, md: 10 }} pt={{ md: 0 }}>
            <Flex
              flexDir="column"
              textAlign="center"
              alignItems="center"
              // pos="absolute"
              // top={0}
              // left="50%"
              transform="translate(0, calc(-120px / 2))"
            >
              <Avatar lg />

              <Heading type="h4" m={0}>
                {auth.fullName}
              </Heading>
            </Flex>

            <Form
              initialFieldsProps={forms.personalInfo.formFields}
              doSubmit={forms.personalInfo.doSubmit}
              submitBtnText="Update Personal Info"
            />

            {/* </Box> */}
          </MiniSection>

          <MiniSection p={{ base: 4, md: 10 }}>
            <Form
              initialFieldsProps={forms.password.formFields}
              doSubmit={forms.password.doSubmit}
              submitBtnText="Change Password"
            />
          </MiniSection>
        </>
      ) : (
        <AccountAuth />
      )}
    </Layout>
  );
};

export default ProfileSettingPage;
