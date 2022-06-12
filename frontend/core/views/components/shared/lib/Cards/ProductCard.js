import { Box, Flex } from "@chakra-ui/layout";
// import { Slider } from "react-rapid-carousel";
import { Heading, Ratings, Text, Image, BuyItem, Link } from "components/shared/lib/";
import formatPrice from "utils/formatPrice";
import truncate from "utils/truncate";

export const ProductBoxedCard = ({ sm, cart, data: item, ...rest }) => (
  <Flex
    // Size of cards
    w={{
      base: "150px",
      sm2: "170px",
      lg2: "215px",
    }}
    h="100%"
    mx={{ base: 1, md: 2 }}
    _hover={{
      boxShadow: "0 0 7px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.1)",
      transform: "scale(.99)",
    }}
    flexDir="column"
    justifyContent="space-between"
    bg="brand.white"
    rounded="md"
    overflow="hidden"
    flexShrink={0}
    as="article"
    {...rest}
  >
    <Link href={`/products/${item.slug}`} mute>
      <Image
        h={{ base: "150px", sm2: "150px", md: "160px" }}
        w="100%"
        bg="brand.white"
        src={item.imageUrl}
        alt={item.title}
        isProduct
      />

      <Box px={2}>
        {/* Mobile */}
        <Box minH="38px">
          <Text
            d={{ base: "block", md: "none" }}
            type="nm-regular"
            as="h4"
            mute
            lineHeight={1.5}
          >
            {truncate(item.title, 32)}
          </Text>
          {/* From Tab */}
          <Text
            d={{ base: "none", md: "block" }}
            type="nm-regular"
            as="h4"
            mute
            lineHeight={1.5}
          >
            {truncate(item.title, 40)}
          </Text>
        </Box>

        {!sm && (
          <Flex alignItems="center">
            <Ratings value={item.ratings} color="brand.primary" sm />
            <Text
              type="sm-regular"
              color="brand.gray4"
              mute
              transform="translate(5px,3px)"
            >
              (30)
            </Text>
          </Flex>
        )}

        <Text type="nm-bold" as="h5" m={0} d={{ base: "block", md: "none" }}>
          {formatPrice("en-NG", item.price, "NGN")}
        </Text>
        <Heading type="h6" as="h5" m={0} d={{ base: "none", md: "block" }}>
          {formatPrice("en-NG", item.price, "NGN")}
        </Heading>
      </Box>
    </Link>

    {!sm && (
      <Box mb={1} px={1} pb={1}>
        <BuyItem w="100%" sm cart={cart} item={item} />
      </Box>
    )}
  </Flex>
);

export const ProductListCard = ({ cart, data: item, ...rest }) => (
  <Flex
    bg="brand.white"
    overflow="hidden"
    flexShrink={0}
    mx={{ base: 1, md: 2 }}
    as="article"
    _hover={{
      boxShadow: "0 0 7px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.1)",
      transform: "scale(1.01)",
    }}
    {...rest}
  >
    <Image
      w={{ base: "70px", sm2: "70px", md: "100px" }}
      h={{ base: "70px", sm2: "70px", md: "100px" }}
      bg="brand.white"
      src={item.imageUrl}
      alt={item.title}
      isProduct
    />

    <Flex flex={1} p={2} flexDir={{ base: "column", md: "row" }}>
      <Flex flex={1.5} flexDir="column" justifyContent="space-between">
        <Box
          w={{
            base: "200px",
            sm2: "250px",
            md: "200px",
            lg: "400px",
            xl: "600px",
          }}
        >
          <Link href={`/products/${item.slug}`}>
            <Text type="md-regular" as="h4" mute>
              {item.title}
            </Text>
          </Link>
          <Text
            // d={{ base: "none", md: "block" }}
            type="nm-regular"
            as="h4"
            mute
            isTruncated
          >
            {item.description}
          </Text>
        </Box>

        <Flex alignItems="center">
          <Ratings value={item.ratings} color="brand.primary" sm />
          <Text
            type="sm-regular"
            color="brand.gray4"
            mute
            transform="translate(5px,3px)"
          >
            (30)
          </Text>
        </Flex>
      </Flex>

      <Flex
        flex={0.5}
        flexDir={{ base: "row", md: "column" }}
        alignItems="flex-end"
        justifyContent="space-between"
        mb={1}
        px={1}
      >
        <Box flex={1}>
          <Text type="nm-bold" as="h5" m={0} d={{ base: "block", md: "none" }}>
            {formatPrice("en-NG", item.price, "NGN")}
          </Text>
          <Text type="md-bold" as="h5" m={0} d={{ base: "none", md: "block" }}>
            {formatPrice("en-NG", item.price, "NGN")}
          </Text>
        </Box>

        <Box>
          <BuyItem
            w={{ base: "auto", md: "100%" }}
            sm
            cart={cart}
            item={item}
            text="Add To Cart"
            responsive
          />
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
