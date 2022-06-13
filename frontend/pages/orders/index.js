import dateFormat from "dateformat";
import { Badge, Box, Flex, ListItem, UnorderedList } from "@chakra-ui/layout";
import {
  Heading,
  Text,
  Link,
  Button,
  Image,
  Icon,
  Pagination,
} from "components/shared/lib";
import { Layout, Loader, Section, SomethingWentWrong } from "components/components/pages";
import { useEffect } from "react";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";
import { AiOutlineRight } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import usePagination from "hooks/usePagination";
import useOrders from "hooks/useOrders";

const pageSEO = buildSEO("Orders", "Orders descriptions...");
const breadcrumb = [{ text: "Orders" }];

const Detail = ({ name, value, inline, ...rest }) => (
  <Flex flexDir={inline ? "row" : "column"} {...rest}>
    {/* Mobile */}
    <Text
      textTransform="uppercase"
      opacity=".8"
      mute
      d={{ base: "block", md: "none" }}
      type="sm-regular"
    >
      {name}
      {inline ? ":" : ""}
    </Text>
    <Text
      ml={{ base: inline ? 1 : 0, md: inline ? 3 : 0 }}
      mute
      type="sm-bold"
      d={{ base: "block", md: "none" }}
    >
      {value}
    </Text>

    {/* From Tab */}
    <Text
      textTransform="uppercase"
      opacity=".8"
      mute
      d={{ base: "none", md: "block" }}
      type="nm-regular"
    >
      {name}
      {inline ? ":" : ""}
    </Text>
    <Text
      ml={{ base: inline ? 1 : 0, md: inline ? 3 : 0 }}
      mute
      type="nm-bold"
      d={{ base: "none", md: "block" }}
    >
      {value}
    </Text>
  </Flex>
);

const OrderItem = ({ data }) => {
  const canceledProps = data.cancelledAt
    ? {
        bg: "brand.gray6",
        boxShadow: "none",
      }
    : {};

  return (
    <Box
      as="section"
      border="1px"
      borderColor="brand.gray5"
      overflow="hidden"
      rounded="md"
      boxShadow="0 0 3px rgba(0, 0, 0, .1), 0 0 20px rgba(0, 0, 0, .15)"
      mb={7}
      color="brand.secondary"
      bg="brand.white"
      {...canceledProps}
    >
      <Flex as="header" px={{ base: 1, md: 5 }} py={1}>
        <Detail
          name="order placed"
          value={dateFormat(data.createdAt, "fullDate")}
        />

        <Detail
          name="order id"
          value={data.trackingId}
          mx={{ base: 4, md: 10 }}
          flex={1}
        />

        <Detail
          name="total amount"
          value={formatPrice("en-NG", data.amount, "NGN")}
        />
      </Flex>

      <Flex
        as="main"
        borderTop="1px"
        borderBottom="1px"
        borderColor="brand.gray5"
        px={{ base: 1, md: 5 }}
        py={{ base: 1, md: 2 }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex flex={1}>
          {/* Mobile */}
          {data.items[0] && (<>
            <Image
              src={data.items[0]?.product.imageUrl}
              w="75px"
              h="75px"
              isProduct
              d={{ base: "block", md: "none" }}
              quality={35}
            />
            {/* From Tab */}
            <Image
              src={data.items[0]?.product.imageUrl}
              w="100px"
              h="100px"
              isProduct
              d={{ base: "none", md: "block" }}
              quality={40}
            />
          </>)}

          <Box flex={1} px={{ base: 1, md: 5 }}>
            <Text type="nm-bold" color="brand.primary" mb={{ base: 0, md: 1 }}>
              {data.items.length} Products Purchased
            </Text>

            <UnorderedList>
              {data.items.slice(0, 3).map((item) => (
                <ListItem key={item.id}>
                  <Flex alignItems="center">
                    <Text mute type="sm-bold">
                      {item.product.name}

                      <Badge ml={2}>X {item.quantity}</Badge>
                    </Text>
                  </Flex>
                </ListItem>
              ))}

              {data.items.length > 3 && (
                <Icon fontSize="1.3rem">
                  <HiDotsHorizontal />
                </Icon>
              )}
            </UnorderedList>
          </Box>
        </Flex>

        <Box alignSelf="flex-end">
          <Link href={`/orders/${data.id}`} mute>
            <Button
              rightIcon={<AiOutlineRight />}
              variant={data.cancelledAt ? "" : "primary"}
              sm
            >
              Order Details
            </Button>
          </Link>
        </Box>
      </Flex>

      <Flex
        as="footer"
        px={{ base: 1, md: 5 }}
        py={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Detail
          name="payment deadline date"
          value={dateFormat(data.paymentDeadlineDate, "fullDate")}
          inline
        />

        {data.cancelledAt && <Badge>Cancelled</Badge>}
      </Flex>
    </Box>
  );
};

const OrdersPage = () => {
  const pagination = usePagination();
  const orders = useOrders();

  useEffect(() => {
    orders.fetch(pagination.page);
  }, [pagination.page]);

  const renderOrderList = () => (
    <Box>
      <Heading type="h5" color="brand.primary">
        Available Orders ({orders.data.total})
      </Heading>

      {orders.data.docs.map((order) => (
        <OrderItem key={order.id} data={order} />
      ))}

      <Pagination
        page={pagination.page}
        onPageChange={pagination.handlePageChange}
        itemTotal={orders.data.docs.length}
        pageTotal={orders.data.pages}
      />
    </Box>
  );

  return (
    <Layout SEO={pageSEO} breadcrumb={breadcrumb}>
      <Section pb={20} pt={{ base: 5, md: 10 }}>
        {orders.loading && <Loader h="150px" />}

        {orders.error && <SomethingWentWrong h="150px" />}

        {orders.data && renderOrderList()}

        {/* {orders.zeroOrders && renderZeroOrders()} */}
      </Section>
    </Layout>
  );
};

export default OrdersPage;
