import {
  headerHeight,
  Layout,
  Section,
  SomethingWentWrong,
} from "components/components/pages";
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
} from "components/shared/lib";
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
      py={1}
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

const AddNewPaymentButton = ({ order }) => {
  const [paymentValue, setPaymentValue] = useState("");
  const [method, setMethod] = useState("card");

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const body = {
        paymentSource: method,
        amount: +paymentValue,
      };

      const {
        data: {
          data: {
            cardPaymentUrl: {
              data: { authorization_url },
            },
          },
        },
      } = await http.post(`/orders/${order.id}/payments`, body);

      router.push(authorization_url);
    } catch (err) {
      toast.displayToast({
        duration: 1500,
        description: err.message,
      });
    }
  };

  const handleTypePayment = ({ target: { value } }) => {
    setPaymentValue(value);
  };

  return (
    <Modal
      renderTrigger={({ handleOpen }) => (
        <>
          {/* Mobile */}
          <Button
            variant="primary"
            onClick={handleOpen}
            sm
            d={{ base: "flex", md: "none" }}
          >
            Add New Payment
          </Button>

          {/* From Tab */}
          <Button
            variant="secondary"
            leftIcon={<BsPlus />}
            onClick={handleOpen}
            d={{ base: "none", md: "flex" }}
          >
            Add New Payment
          </Button>
        </>
      )}
    >
      {({ handleClose }) => (
        <Box as="form" py={5}>
          <TextField
            label="Enter new payment"
            id="new-payment"
            placeholder="E.g. 5000"
            value={paymentValue}
            onChange={handleTypePayment}
          />

          <RadioGroup
            onChange={setMethod}
            value={method}
            w="100%"
            mb={6}
            color="brand.secondary"
          >
            <Stack spacing={3}>
              <Radio value="wallet">
                <Flex alignItems="center" cursor="pointer">
                  <Text mute ml={3} mr={4} type="nm-bold">
                    Wallet
                  </Text>

                  <Icon opacity={0.7}>
                    <FaWallet />
                  </Icon>
                </Flex>
              </Radio>

              <Radio value="card">
                <Flex alignItems="center" cursor="pointer">
                  <Text mute ml={3} mr={4} type="nm-bold">
                    Card
                  </Text>

                  <Icon opacity={0.7}>
                    <ImCreditCard />
                  </Icon>
                </Flex>
              </Radio>
            </Stack>
          </RadioGroup>

          <Button
            w={{ base: "100%", lg: "auto" }}
            mt={{ base: 1, lg: 0 }}
            variant="secondary"
            onClick={handleSubmit}
          >
            Make The Payment
          </Button>
        </Box>
      )}
    </Modal>
  );
};

const CancelOrderButton = ({ canceled, order }) => {
  const toast = useToast();
  const router = useRouter();

  const handleCancelOrder = async (handleCloseConfirmBox) => {
    handleCloseConfirmBox();

    try {
      await http.patch(`/orders/${order.id}/cancellation`);

      router.replace("/orders");
    } catch (err) {
      toast.displayToast({
        duration: 1500,
        description: err.message,
      });
    }
  };

  return (
    <ConfirmBox
      heading="Cancel This Order"
      renderTrigger={({ handleOpen }) => (
        <Button
          bg="brand.errorLight"
          color="brand.error"
          onClick={handleOpen}
          sm
          disabled={canceled}
        >
          {canceled ? "Canceled" : "Cancel Order"}
        </Button>
      )}
      renderConfirm={({ handleClose }) => (
        <Button
          colorScheme="red"
          onClick={handleCancelOrder.bind(null, handleClose)}
        >
          Cancel Order
        </Button>
      )}
    >
      Once you cancel an order, your money will be transferred to your{" "}
      <Badge_ChakraUI>user wallet</Badge_ChakraUI>, so can place future orders.
      Please make sure you want to cancel this order.
    </ConfirmBox>
  );
};

const OrderDetailsPage = ({ order }) => {
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

        {!canceled && isInstallment && totalPayment < order.amount && (
          <AddNewPaymentButton order={order} />
        )}
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
                              : payment.status === "success"
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
    <Layout SEO={pageSEO} breadcrumb={breadcrumb(order.trackingId)}>
      {
        // Error occurred
        order.err ? (
          <Section>
            <SomethingWentWrong message={order.err} />
          </Section>
        ) : (
          // No errors
          <Section pt={10} pb={20}>
            {canceled && (
              <Text>
                This order has been <Badge_ChakraUI>canceled</Badge_ChakraUI> on{" "}
                {dateFormat(order.cancelledAt, "fullDate")}, by{" "}
                {/* Add real data */}
                {order.cancelledBy || "*null*"}
              </Text>
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
                top={{ base: headerHeight.base, lg: headerHeight.lg }}
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

                    <CancelOrderButton canceled={canceled} order={order} />
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
          </Section>
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
