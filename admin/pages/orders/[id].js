import {
  headerHeight,
  Layout,
  Section,
  SomethingWentWrong,
} from "components/pages";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { Box, Flex, Stack, Badge as Badge_ChakraUI } from "@chakra-ui/layout";
import {
  Button,
  ConfirmBox,
  Icon,
  Image,
  Link,
  Modal,
  Text,
  TextField,
} from "components/lib";
import formatPrice from "utils/formatPrice";
import dateFormat from "dateformat";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { FaWallet } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";

const getFullName = (user) => `${user?.firstName} ${user?.lastName}`;

const breadcrumb = (trackingId) => [
  {
    text: "my orders",
    link: `/orders`,
  },
  {
    text: trackingId || "...",
  },
];

const MiniSection = ({ heading, children, ...rest }) => (
  <Box
    as="section"
    overflow="hidden"
    rounded="md"
    shadow="lg"
    mb={7}
    bg="brand.white"
    pb={5}
    {...rest}
  >
    <Box
      as="header"
      borderBottom="1px"
      borderColor="brand.gray6"
      px={5}
      py={3}
      mb={3}
    >
      <Text type="md-bold" mute color="brand.secondary">
        {heading}
      </Text>
    </Box>

    {children}
  </Box>
);

const Detail = ({ name, nameProps, value, children, inline, sm, ...rest }) => (
  <Flex flexDir={inline ? "row" : "column"} {...rest}>
    <Text
      textTransform="uppercase"
      opacity=".8"
      type={`${sm ? "sm" : "nm"}-regular`}
      mute
      {...nameProps}
    >
      {name}
      {inline ? ":" : ""}
    </Text>

    {value ? (
      <Text ml={inline ? 2 : 0} type={`${sm ? "sm" : "nm"}-bold`} mute>
        {value}
      </Text>
    ) : (
      children
    )}
  </Flex>
);

const ProductItem = ({ data }) => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      justifyContent="space-between"
      py={2}
      px={1}
      borderBottom="1px"
      borderColor="brand.gray6"
    >
      <Flex alignItems="center">
        <Image
          src={data.product.imageUrl}
          w="75px"
          h="75px"
          isProduct
          quality={35}
          ml={{ base: 0, md: 5 }}
          mr={5}
        />

        <Box flex={1}>
          <Link href={`/products/${data.product.slug}`}>
            <Text mute type="nm-bold">
              {data.product.name}
            </Text>
          </Link>

          <Detail name="quantity" value={data.quantity} inline />
        </Box>
      </Flex>

      <Detail
        name="price"
        value={formatPrice("en-NG", data.quantity * data.price, "NGN")}
        inline
        alignSelf="flex-end"
      />
    </Flex>
  );
};

const Badge = ({ variant = "secondary", children, role, ...rest }) => {
  if (role) {
    if (role === "customer") {
      children = role;
    } else if (role === "marketer") {
      children = role;
    }
  }

  const styles =
    variant === "primary"
      ? { bg: "brand.primaryLight", color: "brand.primary" }
      : variant === "secondary"
      ? { bg: "brand.secondaryLight", color: "brand.secondary" }
      : { bg: "brand.gray6", color: "brand.black2" };

  return (
    <Box
      px={1}
      rounded="sm"
      opacity={0.85}
      fontWeight="bold"
      fontSize=".85rem"
      textTransform="uppercase"
      {...styles}
      {...rest}
    >
      {children}
    </Box>
  );
};

const OrderDetailsPage = ({ order }) => {
  const router = useRouter();

  const isInstallment = order.isOutrightPurchase === false;

  let totalPayment = 0;

  totalPayment = order.payments?.reduce((previousAmount, { amount }) => {
    return previousAmount + amount;
  }, 0);

  let pageTitle = "",
    pageDesc = "";

  if (order.err) {
    pageTitle = "Order Error";
    pageDesc = "An error occurred, while fetching this page";
  } else {
    pageTitle = order.trackingId;
    pageDesc = "This page, helps you track an particular order";
  }

  const pageSEO = buildSEO(pageTitle, pageDesc);

  const orderDetails = [
    {
      details: [
        {
          name: "placed",
          value: dateFormat(order.createdAt, "fullDate"),
        },
        {
          name: "payment deadline",
          value: dateFormat(order.paymentDeadlineDate, "fullDate"),
        },
      ],
    },
    {
      details: [
        {
          name: "Owner",
          value: getFullName(order.customer),
        },
      ],
      badge: (
        <Badge
          // role={order.customer.role}
          children="*null*"
        />
      ),
    },
    {
      details: [
        {
          name: "Creator",
          value: getFullName(order.creator),
        },
      ],
      badge: (
        <Badge
          // role={order.creator.role}
          children="*null*"
        />
      ),
    },
  ];

  const canceled = order.cancelledAt ? true : false;

  const renderedPaymentInfo = (
    <MiniSection heading="Payment Information">
      <Flex
        px={5}
        pt={2}
        pb={4}
        borderBottom="1px"
        borderColor="brand.gray6"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Detail name="payment type">
          <Badge variant="primary" w="fit-content">
            {isInstallment ? "installment" : "instant"}
          </Badge>
        </Detail>
      </Flex>

      <Box px={5} py={2} borderBottom="1px" borderColor="brand.gray6">
        <Detail name="payment history" nameProps={{ pb: 5 }}>
          <Box pb={3} borderLeft="1px" borderColor="brand.gray4">
            {order.payments?.map((payment, index) => (
              <Detail
                key={index}
                name={<Badge_ChakraUI># {index + 1}</Badge_ChakraUI>}
                nameProps={{
                  type: "sm-bold",
                  pb: 2,
                }}
                pl={4}
                pb={1}
                mb={2}
                borderBottom="1px"
                borderColor="brand.gray6"
                className="payment-stage"
              >
                <Flex flexWrap="wrap" pl={4} className="payment-stage__items">
                  {[
                    {
                      name: "amount",
                      value: formatPrice("en-NG", payment.amount, "NGN"),
                    },
                    { name: "source", value: payment.source },
                    {
                      name: "status",
                      value: (
                        <Badge_ChakraUI
                          colorScheme={
                            payment.status === "pending"
                              ? "yellow"
                              : payment.status === "successful"
                              ? "green"
                              : "red"
                          }
                        >
                          {payment.status}
                        </Badge_ChakraUI>
                      ),
                    },
                    {
                      name: "date",
                      value: dateFormat(payment.createdAt, "fullDate"),
                    },
                  ].map((item) => (
                    <Detail
                      mr={5}
                      sm
                      inline
                      {...item}
                      key={item.name}
                      nameProps={{
                        textTransform: "capitalize",
                      }}
                    />
                  ))}
                </Flex>
              </Detail>
            ))}
          </Box>
        </Detail>
      </Box>
    </MiniSection>
  );

  return (
    <Layout SEO={pageSEO} page="orders table" pageDisplayText="order details">
      {
        // Error occurred
        order.err ? (
          <Section>
            <SomethingWentWrong message={order.err} onRetry={router.reload} />
          </Section>
        ) : (
          // No errors
          <>
            {canceled && (
              <Section mute>
                <Text>
                  This order has been <Badge_ChakraUI>canceled</Badge_ChakraUI>{" "}
                  on {dateFormat(order.cancelledAt, "fullDate")}, by{" "}
                  {/* Add real data */}
                  {order.cancelledBy || "*null*"}
                </Text>
              </Section>
            )}

            <Flex flexDir={{ base: "column", lg: "row" }}>
              {/* Main Area */}
              <Box flex={1.4} mr={{ base: 0, lg: 7 }}>
                <MiniSection heading="Products Ordered">
                  <Box px={5}>
                    {order.items.map((item) => (
                      <ProductItem key={item.id} data={item} />
                    ))}
                  </Box>
                </MiniSection>

                <Box d={{ base: "none", lg: "block" }}>
                  {renderedPaymentInfo}
                </Box>
              </Box>

              {/* Aside */}
              <Box
                flex={0.65}
                alignSelf={{ base: "stretch", lg: "flex-start" }}
                pos="sticky"
                top={0}
              >
                <MiniSection heading="Order Details" mb={5}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    px={5}
                  >
                    <Detail
                      name="Total Price"
                      value={formatPrice("en-NG", order.amount, "NGN")}
                    />
                  </Flex>

                  {orderDetails.map((item, index) => (
                    <Box
                      px={5}
                      py={2}
                      key={index}
                      borderBottom="1px"
                      borderColor="brand.gray6"
                    >
                      <Flex alignItems="center" justifyContent="space-between">
                        <Box mr={2}>
                          {item.details.map((detail) => (
                            <Detail {...detail} key={detail.name} pb={2} />
                          ))}
                        </Box>
                        {item.badge}
                      </Flex>
                    </Box>
                  ))}
                </MiniSection>

                {/* For Mobile viewers */}
                <Box d={{ base: "block", lg: "none" }}>
                  {renderedPaymentInfo}
                </Box>
              </Box>
            </Flex>
          </>
        )
      }
    </Layout>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const { id } = query;
  const { token } = req.cookies;

  let order;

  try {
    const {
      data: { data },
    } = await http.get(`/orders/${id}`, { token });

    order = data;
  } catch (err) {
    order = { err: err.message };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderDetailsPage;
