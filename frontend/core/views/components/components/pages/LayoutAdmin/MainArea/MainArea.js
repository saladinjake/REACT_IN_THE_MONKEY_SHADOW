import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import { Heading } from "components/shared/lib";
import useDimensions from "hooks/useDimensions";

/**
 * This component is used in the Layout (page-wrapper) once
 * And also is the content for every page (which makes them unique)
 */
const MainArea = ({ children, ...rest }) => {
  const dimensions = useDimensions();

  return (
    <Flex
      flexDir="column"
      as="main"
      pt={7}
      px={{ base: 2, lg: 5 }}
      boxShadow="inset 0 2px 15px rgba(0, 0, 0, .03), inset 0 5px 15px rgba(0, 0, 0, .03)"
      w={dimensions.mainAreaWidth}
      {...rest}
    >
      {children}
    </Flex>
  );
};

MainArea.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainArea;
