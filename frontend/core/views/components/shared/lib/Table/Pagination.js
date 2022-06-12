import { Flex } from "@chakra-ui/layout";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { IconButton } from "../Button/Button";
import { Text } from "../Typography/Text";

export const Pagination = ({
  itemTotal,
  pageTotal,
  page,
  onPageChange,

  variant = "secondary",
}) => {
  const color = `brand.${variant}`;

  return (
    <Flex as="footer" alignItems="center" flexDir="column" mt={5} color={color}>
      <Text mb={2}>
        Showing{" "}
        <Text type="nm-bold" as="span">
          {itemTotal || 0}
        </Text>{" "}
        results
      </Text>

      <Flex alignItems="center">
        <IconButton
          variant={variant}
          disabled={page === 1}
          onClick={onPageChange.bind(null, -1)}
        >
          <VscChevronLeft />
        </IconButton>

        <Text type="nm-bold" mute mx={4}>
          Page {page}
        </Text>

        <IconButton
          variant={variant}
          disabled={pageTotal ? page === pageTotal : false}
          onClick={onPageChange.bind(null, 1)}
        >
          <VscChevronRight />
        </IconButton>
      </Flex>
    </Flex>
  );
};
