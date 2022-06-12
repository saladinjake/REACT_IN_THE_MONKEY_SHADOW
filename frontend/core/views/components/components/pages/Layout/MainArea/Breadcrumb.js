import { Box, Flex } from "@chakra-ui/layout";
import { Link, Text } from "components/shared/lib";
import PropTypes from "prop-types";
import breakpoints from "theme/breakpoints";

const Breadcrumb = ({ data }) => {
  return (
    <Flex
      maxW={breakpoints.xl}
      mx="auto"
      px={6}
      py={3}
      bg="brand.gray6"
      color="brand.secondary"
      d={{ base: "none", md: "flex" }}
    >
      {data.map((item, index) => (
        <Flex alignItems="center" key={index}>
          {index ? (
            <Box border="1px" bg="brand.black2" w="20px" h={0} mx={3}></Box>
          ) : (
            ""
          )}
          {item.link ? (
            <Link href={item.link}>
              <Text type="nm-bold" m={0}>
                {item.text}
              </Text>
            </Link>
          ) : (
            <Text m={0}>{item.text}</Text>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

Breadcrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Breadcrumb;
