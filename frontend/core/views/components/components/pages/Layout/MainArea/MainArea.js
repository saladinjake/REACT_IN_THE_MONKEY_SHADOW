import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import breakpoints from "theme/breakpoints";
import Breadcrumb from "./Breadcrumb";

/**
 * This component is used in the Layout (page-wrapper) once
 * And also is the content for every page (which makes them unique)
 */
const MainArea = ({ breadcrumb, children, bg = "brand.white" }) => {
  // Automatically add a `homepage` data to the breadcrumb's data? if at all the `breadcrumb` prop was passed
  breadcrumb = breadcrumb && [{ text: "Home", link: "/store" }, ...breadcrumb];

  return (
    <Box as="main" flex="1" w="100%" maxW={breakpoints.xxl} mx="auto" bg={bg}>
      {breadcrumb && <Breadcrumb data={breadcrumb} />}

      {children}
    </Box>
  );
};

MainArea.propTypes = {
  breadcrumb: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  children: PropTypes.any.isRequired,
};

export default MainArea;
