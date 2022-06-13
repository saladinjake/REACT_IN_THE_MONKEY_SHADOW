import { Box, Flex } from "@chakra-ui/react";
import { Heading } from "components/lib";
import PropTypes from "prop-types";

export const Section = ({ children, mute, ...rest }) => {
  const getProps = () => {
    if (!mute) {
      return {
        bg: "brand.white",
        rounded: "md",
        shadow: "md",
        p: { base: 2, lg: 5 },
      };
    }

    return {};
  };

  return (
    <Box as="section" mb={5} {...getProps()} {...rest}>
      {children}
    </Box>
  );
};

export const PageHeader = ({ children, renderButton }) => {
  const renderHeading = () => (
    <Heading type="h4" as="h1" mb={0} color="brand.success">
      {children}
    </Heading>
  );

  return (
    <Section py={7} as="header">
      {renderButton ? (
        <>
          <Flex
            d={{ base: "none", md: "flex" }}
            alignItems="center"
            justifyContent="space-between"
          >
            {renderHeading()}
            {renderButton()}
          </Flex>

          <Flex
            d={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="space-between"
          >
            {renderHeading()}
          </Flex>
        </>
      ) : (
        renderHeading()
      )}
    </Section>
  );
};

Section.propTypes = {
  children: PropTypes.any,
};
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  renderButton: PropTypes.func,
};
