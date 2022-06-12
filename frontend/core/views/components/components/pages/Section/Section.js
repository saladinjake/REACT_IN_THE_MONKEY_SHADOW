import { Box, Flex } from "@chakra-ui/react";
import { Heading } from "components/shared/lib";
import PropTypes from "prop-types";
import breakpoints from "theme/breakpoints";

export const Section = ({ children, ...rest }) => {
  return (
    <Box
      as="section"
      px={{ base: 2, sm2: 6 }}
      maxW={breakpoints.xl}
      mx="auto"
      {...rest}
    >
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
