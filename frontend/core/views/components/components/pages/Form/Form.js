import PropTypes from "prop-types";
import { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Heading, TextField } from "components/shared/lib";
import { Section } from "components/components/pages";
import useAuth from "hooks/useAuth";

export const Form = ({
  stayAuthenticated,
  formData,
  children,
  headerText,
  footerContent,
  toast: successToast,
}) => {
  const auth = useAuth();
  const toast = useToast();

  // All pages using the component will `sign the user out`? if the user is signed-in already
  useEffect(() => {
    if (auth.isAuthenticated && !stayAuthenticated) {
      auth.signout();
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    toast.closeAll();

    if (formData.formSubmitState.hasSubmitError) {
      toast({
        position: "top",
        description: formData.formSubmitState.hasSubmitError,
        status: "error",
        duration: 5 * 1000,
        isClosable: true,
      });
    }

    if (formData.formSubmitState.hasSubmitted) {
      toast({
        position: "top",
        description: successToast.description,
        status: "success",
        duration: 9 * 1000,
        isClosable: true,
      });
    }
  }, [
    formData.formSubmitState.hasSubmitError,
    formData.formSubmitState.hasSubmitted,
    successToast.description,
  ]);

  return (
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
        <Box as="header" flexWrap="wrap" textAlign="center" mb={5}>
          <Heading type="h4" as="h1" color="brand.primary">
            {headerText}
          </Heading>
        </Box>

        <Box as="form" mt={8} {...formData?.formProps}>
          {children ? (
            <>{    children}</>
        
          ) : (
            <>
              {formData?.fieldsProps?.map((field) => (
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
    </Section>
  );
};

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  toast: PropTypes.object,
  children: PropTypes.any,
  headerText: PropTypes.string,
  footerContent: PropTypes.any,
};
