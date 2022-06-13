import { Box, Flex, Grid, GridItem, Stack } from "@chakra-ui/layout";
import { Button, Heading, Icon, Image, Text, TextField } from "components/shared/lib";
import { Empty, Layout, Loader, PageHeader, Section } from "components/components/pages";
import { IoHelpCircle } from "react-icons/io5";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaWallet } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";
import useCart from "hooks/useCart";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import http from "utils/http";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import useToast from "hooks/useToast";

const pageSEO = buildSEO(
  "Checkout",
  "Checkout your products in cart ready to be purchased"
);

const MiniSection = ({ children, header, ...rest }) => (
  <Box
    rounded="md"
    shadow="md"
    pt={4}
    pb={3}
    px={3}
    mb={{ base: 3, md: 5 }}
    {...rest}
    bg="brand.white"
  >
    <Heading type="h5">{header}</Heading>

    {children}
  </Box>
);

const CartItem = ({ data: item, index, ...rest }) => (
  <Flex
    rounded={{ base: "none", md: "md" }}
    overflow="hidden"
    py={4}
    borderTop={index && "1px solid"}
    borderColor="brand.gray5"
    {...rest}
  >
    <Image w="75px" h="75px" src={item.imageUrl} isProduct dropShadow />

    <Flex
      alignItems={{ md: "center" }}
      justifyContent={{ md: "space-between" }}
      flexDir={{ base: "column", md: "row" }}
      mx={3}
      flex={1}
    >
      <Box flex={1}>
        <Heading m={0}>{item.title}</Heading>
        <Text m={0}>
          {item.qty} Piece{item.qty > 1 && "s"}
        </Text>
      </Box>

      <Text m={0} pl={2} type="nm-bold">
        {formatPrice("en-NG", item.price, "NGN")}
      </Text>
    </Flex>
  </Flex>
);

const Field = ({ data }) => (
  <GridItem>
    <TextField
      // State
      label={data.label}
      id={data.label}
      value={data.value}
      onChange={() => {}}
      disabled
      //
      // Styles
      flex={1}
      bg="brand.white"
      formGroup={{ m: 0 }}
    />
  </GridItem>
);

const MiniForm = ({ data }) => (
  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} columnGap={3}>
    {data.map((field, index) => (
      <Field key={index} data={field} />
    ))}
  </Grid>
);

const TotalSection = ({ cart, cost, ...rest }) => {
  return (
    <MiniSection
      ml={{ base: 0, md: 5 }}
      flex={0.5}
      alignSelf="flex-start"
      pos="sticky"
      // Have to consider the `height` of the `Header` in Layout
      top={{ base: "64px", lg: "70px" }}
      //
      header="Total"
      {...rest}
    >
      <Grid templateColumns="1.4fr .6fr">
        <GridItem mb={2}>
          <Text type="sm-regular" color="brand.gray2" w="150px" m={0}>
            {cart?.count} Piece{cart?.count > 1 && "s"} of item
            {cart?.count > 1 && "s"} in the amount of:
          </Text>
        </GridItem>
        <GridItem textAlign="right">
          {cart && (
            <Text type="nm-bold">
              {formatPrice("en-NG", cost?.cartTotalPrice || "0.00", "NGN")}
            </Text>
          )}
        </GridItem>

        <GridItem mb={8}>
          <Text type="sm-regular" color="brand.gray2" m={0}>
            delivery cost:
          </Text>
        </GridItem>
        <GridItem textAlign="right">
          <Text type="nm-bold">
            {formatPrice("en-NG", cost.deliveryFee || "0.00", "NGN")}
          </Text>
        </GridItem>

        <GridItem>
          <Text type="nm-bold" m={0}>
            Total Amount:
          </Text>
        </GridItem>
        <GridItem textAlign="right">
          <Text type="md-bold" m={0}>
            {formatPrice("en-NG", cost.totalPrice || "0.00", "NGN")}
          </Text>
        </GridItem>
      </Grid>
    </MiniSection>
  );
};

const PaymentTypeTab = ({ cost, setOrderData }) => {
  const [active, setActive] = useState("Installment");
  const [instalmentInitialAmt, setInstalmentInitialAmt] = useState("500");

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      initialAmount: 0,
      isOutrightPurchase: active === "Installment" ? false : true,
    }));
  }, [active]);

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      initialAmount: +instalmentInitialAmt,
    }));
  }, [instalmentInitialAmt]);

  const handleInstalmentChange = ({ target: { value } }) => {
    setInstalmentInitialAmt(value);
  };

  const renderControl = (icon, text) => (
    <Flex
      py={{ base: 3, md: 4, lg: 6 }}
      px={5}
      mr={{ base: 3, md: 4, lg: 6 }}
      bg="brand.white"
      alignItems="center"
      rounded="md"
      cursor="pointer"
      _hover={{ color: "brand.success" }}
      tabIndex={1}
      // Active State
      color={active === text ? "brand.success" : "inherit"}
      border={active === text ? "2px solid" : "none"}
      onClick={() => setActive(text)}
    >
      <Icon mr={3} fontSize={{ base: "200%", md: "150%", lg: "200%" }}>
        {icon}
      </Icon>

      <Text d={{ base: "block", md: "none" }} type="nm-bold" m={0}>
        {text}
      </Text>
      <Text d={{ base: "none", md: "block" }} type="md-regular" m={0}>
        {text} Payment
      </Text>
    </Flex>
  );

  const renderInstantTabBtn = () => renderControl(<GiTakeMyMoney />, "Instant");
  const renderInstalmentTabBtn = () =>
    renderControl(<GiPayMoney />, "Installment");

  const InstantContent = (
    <Flex
      alignItems={{ base: "flex-start", md: "center" }}
      color="brand.success"
    >
      <Icon mr={1} pt={{ base: 1, md: 0 }} fontSize="120%">
        <IoHelpCircle />
      </Icon>

      <Text m={0} type="nm-bold">
        You're to pay the total{" "}
        <Text as="span" type="md-bold">
          {formatPrice("en-NG", cost.totalPrice, "NGN")}
        </Text>{" "}
        at once
      </Text>
    </Flex>
  );
  const InstalmentContent = (
    <>
      <Heading color="brand.success">Instalment Process</Heading>

      <Text mb={3}>Please fill the to choose how you are going to pay us</Text>

      <Flex
        alignItems={{ base: "flex-start", md: "center" }}
        mb={10}
        color="brand.success"
      >
        <Icon mr={1} fontSize="120%">
          <IoHelpCircle />
        </Icon>

        <Text m={0}>The span for this payment only last for 3 months</Text>
      </Flex>

      <TextField
        label="Initial Payment"
        id="initial-payment"
        placeholder="E.g. 5000"
        value={instalmentInitialAmt}
        onChange={handleInstalmentChange}
        formGroup={{ m: 0, w: { base: "100%", lg: "auto" } }}
        w="100%"
      />
    </>
  );

  const renderContent = () =>
    active === "Instant" ? InstantContent : InstalmentContent;

  return (
    <>
      <Flex mb={3}>
        {renderInstantTabBtn()}
        {renderInstalmentTabBtn()}
      </Flex>

      <Box bg="brand.gray6" p={3} rounded="md">
        {renderContent()}
      </Box>
    </>
  );
};

const PaymentMethod = ({ cart, router, orderData, setOrderData }) => {
  const toast = useToast();

  const [method, setMethod] = useState("card");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!orderData.isOutrightPurchase && orderData.initialAmount < 500) {
        toast.displayToast({
          description:
            "The `Initial Payment` in `Payment type`, must be from '500'",
          duration: 5000,
        });
      } else {
        const {
          data: {
            data: {
              cardPaymentUrl: {
                data: { authorization_url },
              },
            },
          },
        } = await http.post("/orders", orderData);

        cart.resetCart();

        router.push(authorization_url);
      }
    } catch (err) {
      toast.displayToast({
        description: err.message,
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      paymentSource: method.toLowerCase(),
      walletType: "customer",
    }));
  }, [method]);

  return (
    <Box as="form" onSubmit={handleSubmit}>
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
        type="submit"
      >
        Make The Payment
      </Button>
    </Box>
  );
};

const Checkout = () => {
  const auth = useAuth();
  const router = useRouter();
  const cart = useCart();

  const [cost, setCost] = useState({});

  // Data to be sent for an `order initialization`, to the server
  const [orderData, setOrderData] = useState({
    walletType: "",
    customerRefCode: "",
    paymentSource: "",
    // if false ? instalment : instant
    isOutrightPurchase: false,
    initialAmount: 0,
  });

  // useEffect(() => {
  //   setOrderData((prev) => ({
  //     ...prev,
  //     customerRefCode: auth.currentUser.refCode,
  //   }));
  // }, [auth.currentUser.refCode]);

  useEffect(() => {
    if (cart?.isReady) {
      const deliveryFee = 0;

      setCost({
        deliveryFee,
        cartTotalPrice: cart?.total,
        totalPrice: cart?.total + deliveryFee,
      });
    }
  }, [cart?.isReady, cart?.total]);

  const forms = {
    contactInfo: [
      { label: "Phone Number", value: "(+234) 70-xxx-xxx-xx" },
      { label: "Name", value: "Test Name" },
      { label: "Email", value: "samaplemail@sample.com" },
    ],
    personalInfo: [
      { label: "State", value: "Lagos state" },
      { label: "Nearest Bus-stop", value: "Ojuelegba" },
      { label: "Address", value: "85 Ayilara street, ojuelegba." },
    ],
  };

  return (
    <Layout SEO={pageSEO} bg="brand.gray6">
      <PageHeader>My Checkout</PageHeader>

      {cart?.isEmpty ? (
        <Empty />
      ) : (
        <Section pb={20}>
          <Flex>
            {/* Main Content */}
            <Box flex={1.5}>
              <MiniSection header="Products in Cart">
                {cart?.loading ? (
                  <Box pos="relative" h="200px">
                    <Loader pos="absolute" top={0} left={0} w="100%" h="100%" />
                  </Box>
                ) : (
                  cart?.data?.map((item, index) => (
                    <CartItem key={index} index={index} data={item} />
                  ))
                )}
              </MiniSection>

              <MiniSection header="Contact Information">
                <MiniForm data={forms.contactInfo} />

                <Button mute mt={6} mb={1} color="brand.success">
                  Another person will receive this order
                </Button>
              </MiniSection>

              {/* Total Section for only Mobile viewers */}
              <TotalSection
                pos="unset"
                d={{ base: "block", md: "none" }}
                cart={cart}
                cost={cost}
              />

              {cart?.isReady && (
                <>
                  <MiniSection header="Payment type">
                    <PaymentTypeTab cost={cost} setOrderData={setOrderData} />
                  </MiniSection>

                  <MiniSection header="Payment method">
                    <PaymentMethod
                      cart={cart}
                      router={router}
                      orderData={orderData}
                      setOrderData={setOrderData}
                    />
                  </MiniSection>
                </>
              )}
            </Box>

            {/* Aside */}
            <TotalSection
              d={{ base: "none", md: "block" }}
              cart={cart}
              cost={cost}
            />
          </Flex>
        </Section>
      )}
    </Layout>
  );
};

export default Checkout;
