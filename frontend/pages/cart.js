import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Button, Counter, IconButton, Text, Link, Image } from "components/shared/lib";
import { Layout, PageHeader, Section, Loader, Empty } from "components/components/pages";
import useCart from "hooks/useCart";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";

const pageSEO = buildSEO("Cart", "Your items in cart");

const Table = ({
  rows,
  handleQtyIncrease,
  handleQtyDecrease,
  handleItemDelete,
}) => {
  const renderCounter = (item) => (
    <Counter
      qty={item.qty}
      onQtyIncrease={handleQtyIncrease.bind(null, item)}
      onQtyDecrease={handleQtyDecrease.bind(null, item)}
    />
  );

  const renderDeleteIcon = (item) => (
    <IconButton
      onClick={handleItemDelete.bind(null, item.id)}
      variant="ghost"
      color="brand.error"
    >
      <BsTrash />
    </IconButton>
  );

  const renderPrice = (item) => (
    <Text m={0} type="nm-bold">
      {formatPrice("en-NG", item.qtyPrice, "NGN")}
    </Text>
  );

  return (
    <Box bg="brand.white" p={3} rounded="md">
      {/* Head */}
      <Grid
        templateColumns="3fr 1fr 1fr .25fr"
        d={{ base: "none", md: "grid" }}
      >
        <GridItem>
          <Text type="nm-bold" color="brand.gray3">
            Product
          </Text>
        </GridItem>
        <GridItem>
          <Text type="nm-bold" color="brand.gray3">
            Quantity
          </Text>
        </GridItem>
        <GridItem>
          <Text type="nm-bold" color="brand.gray3">
            Price
          </Text>
        </GridItem>
      </Grid>

      {/* Body */}
      {rows.map((item, index) => (
        <Grid
          key={index}
          templateColumns={{ base: "1fr", md: "3fr 1fr 1fr .25fr" }}
          py={4}
          borderTop={index && "1px solid"}
          borderColor="brand.gray5"
          alignItems="center"
          pos="relative"
        >
          <GridItem>
            <Flex>
              <Image
                w="75px"
                h="75px"
                src={item.imageUrl}
                isProduct
                dropShadow
              />

              <Box ml={3}>
                <Text mb={0} type="nm-bold">
                  {item.title}
                </Text>
                <Text m={0}>{item.description}</Text>
              </Box>
            </Flex>
          </GridItem>

          <GridItem d={{ base: "none", md: "block" }}>
            {renderCounter(item)}
          </GridItem>

          <GridItem d={{ base: "none", md: "block" }}>
            {renderPrice(item)}
          </GridItem>

          <GridItem d={{ base: "none", md: "block" }}>
            {renderDeleteIcon(item)}
          </GridItem>

          {/* Visible only on Mobile screens */}
          <GridItem d={{ base: "block", md: "none" }} mt={3}>
            <Flex justifyContent="space-between" alignItems="center">
              {renderCounter(item)}
              {renderPrice(item)}
              {renderDeleteIcon(item)}
            </Flex>
          </GridItem>
        </Grid>
      ))}
    </Box>
  );
};

const cart = () => {
  const cart = useCart();

  const handleQtyIncrease = (item) => {
    cart.increaseQty(item);
  };
  const handleQtyDecrease = (item) => {
    cart.decreaseQty(item);
  };
  const handleItemDelete = (id) => {
    cart.removeItem(id);
  };

  return (
    <Layout SEO={pageSEO} bg="brand.gray6">
      <PageHeader>Shopping Cart</PageHeader>
      {cart?.isEmpty ? (
        <Empty />
      ) : (
        <>
          <Section pb={10}>
            {cart?.loading ? (
              <Loader />
            ) : (
              cart?.data && (
                <Table
                  rows={cart?.data}
                  handleQtyIncrease={handleQtyIncrease}
                  handleQtyDecrease={handleQtyDecrease}
                  handleItemDelete={handleItemDelete}
                />
              )
            )}
          </Section>

          {/* Footer */}
          <Section pb={20} textAlign={{ base: "center", md: "left" }}>
            <Flex flexDir={{ base: "column", md: "row" }} alignItems="center">
              <Box flex={1}>
                <Link mute href="/store">
                  <Button leftIcon={<AiOutlineLeft />} bg="transparent">
                    Back to Shopping
                  </Button>
                </Link>
              </Box>

              {!cart?.loading && cart?.data && (
                <>
                  <Text mb={{ base: 5, md: 0 }}>
                    Total: {/* Mobile */}
                    <Text
                      //
                      type="lg-bold"
                      as="span"
                      d={{ base: "inline", md: "none" }}
                    >
                      {formatPrice("en-NG", cart.total, "NGN")}
                    </Text>
                    {/* from Tab */}
                    <Text
                      //
                      type="md-bold"
                      as="span"
                      d={{ base: "none", md: "inline" }}
                    >
                      {formatPrice("en-NG", cart.total, "NGN")}
                    </Text>
                  </Text>

                  <Link mute href="/checkout">
                    <Button
                      variant="secondary"
                      ml={5}
                      rightIcon={<AiOutlineRight />}
                      variant="primary"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </>
              )}
            </Flex>
          </Section>
        </>
      )}
    </Layout>
  );
};

export default cart;
