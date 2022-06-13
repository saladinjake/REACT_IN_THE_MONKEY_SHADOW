import React , { useState} from "react"

import { Layout } from "components/components/pages";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Button, Link, Text, Tab, Image } from "components/shared/lib";
import { Section, CartIcon } from "components/components/pages";
import { AiOutlineRight } from "react-icons/ai";
import breakpoints from "theme/breakpoints";
import formatPrice from "utils/formatPrice";

import buildSEO from "utils/buildSEO";
const pageSEO = buildSEO("Landing","Description")





const CustomerReview = () => (
    <Box
      flexShrink="0"
      shadow="md"
      rounded="md"
      p={4}
      my={4}
      bg="brand.white"
      mx={4}
      w={{ base: "300px", md: "350px" }}
    >
      <Text lineHeight="25px">
       I am happy I destroyed my enemies base camp with the help of your machines,
       I enrolled and bought machines from putins arsenal on this web page , shipped them to ukraine and then used them against Russian SOLDIERS.
       They had the taste of their own medicine. I would buy more nukes this time and put them right into putins mouth.
      </Text>

      <Flex
        mt={3}
        textAlign={{ base: "left", md: "right" }}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        alignItems="flex-end"
      >
        <Box color="brand.secondary">
          <Text m={0} type="nm-bold">
            Ukraine President
          </Text>

          <Text m={0}>Your Enemy</Text>
        </Box>

        <Image
          src="/images/lg/customer-satisfaction.jpeg"
          border="1px"
          rounded="full"
          ml={2}
          w="65px"
          h="65px"
        />
      </Flex>
    </Box>
  );

  // A function that renders the content for `Kitchen` tab
  const renderTabKitchenAppliancesContent = (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems={{ base: "center", md: "stretch" }}
    >
      {/* Big Card */}
      <Flex
        flexDir="column"
        alignItems="center"
        textAlign="center"
        p={5}
        w={{ base: "300px", md: "400px" }}
        rounded="xl"
        bg="brand.white"
        border="1px"
        borderColor="brand.gray5"
        mr={{ md: 10 }}
        mb={{ base: 5, md: 0 }}
      >
        <Image
          mt="auto"
          w={{ base: "200px", md: "300px" }}
          h={{ base: "150px", md: "250px" }}
          mb={{ base: 4, md: 10 }}
          isProduct
          src="/images/lg/product 3.png"
        />

        <Heading w={{ base: "180px", md: "300px" }}>
          AddWash™, 10kg, Washer Dryer, 4 Ticks
        </Heading>

        <Text mb="auto" type="sm-regular" lineHeight="20px">
          Simply add during wash with AddWash door Wash & dry in 59 minute
        </Text>

        <Button variant="secondary" leftIcon={<CartIcon />} sm w="100%">
          Buy now
        </Button>
      </Flex>

      {/* Small Cards */}
      <Flex flexDir="column" w="300px" rounded="lg">
        <Box
          d="grid"
          placeItems="center"
          textAlign="center"
          p={5}
          w="300px"
          h={{ base: "200px", md: "255px" }}
          flex="1"
          rounded="lg"
          bg="brand.white"
          border="1px"
          borderColor="brand.gray5"
          mb={{ base: 5, md: 10 }}
        >
          <Image
            w={{ base: "200px", md: "120px" }}
            h={{ base: "150px", md: "100px" }}
            isProduct
            mb={4}
            src="/images/lg/product 2.png"
          />

          <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

          {/* <Text type="sm-regular" lineHeight="20px">
            Simply add during wash with AddWash door Wash & dry in 59 minute
          </Text> */}

          <Button variant="secondary" leftIcon={<CartIcon />} sm>
            Buy now
          </Button>
        </Box>
        <Box
          d="grid"
          placeItems="center"
          textAlign="center"
          p={5}
          w="300px"
          h={{ base: "200px", md: "255px" }}
          flex="1"
          rounded="lg"
          bg="brand.white"
          border="1px"
          borderColor="brand.gray5"
        >
          <Image
            w={{ base: "200px", md: "120px" }}
            h={{ base: "150px", md: "100px" }}
            isProduct
            mb={4}
            src="/images/lg/product 1.png"
          />

          <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

          {/* <Text type="sm-regular" lineHeight="20px">
            Simply add during wash with AddWash door Wash & dry in 59 minute
          </Text> */}

          <Button variant="secondary" leftIcon={<CartIcon />} sm>
            Buy now
          </Button>
        </Box>
      </Flex>
    </Flex>
  );


const LandingPage = () => {
  // The `Special Products`'s Tab data
  const specialProductsTabData = [
    { header: "TV's", content: "TV's content" },
    {
      header: "Kitchen Appliances",
      content: renderTabKitchenAppliancesContent,
    },
    { header: "IT", content: "IT content" },
    { header: "Other Offers", content: "Other Offers content" },
  ];

  return (
    <Layout
      SEO={pageSEO}
      withFooterEmailSection
    >
      {/* Hero */}
      <Section
        maxW={breakpoints.xxl}
        bg="gray.100"
        px={6}
        py={{ base: 10, lg: 20 }}
      >
        <Flex justifyContent="center" >
          <Flex alignItems="" mr={{ lg: 16 }}>
            <Box pt={6} pb={{ lg: "45px" }} >
              <Box maxW="500px">
                <Heading type="h2" as="h1" color="brand.secondary">
                  The only way to peace is the aftermath of war
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                  Inhouse , Inbounds bombshells, artilerries, drones, killer robots, nukes and all war gadgets.
                  Take out your enemies before they take you out.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Create an Account</Button>
              </Link>

              {/* <Box mt="30px">
                <Heading type="h5" mb={3}>
                  popular brands
                </Heading>

                <Box bg="rgba(0, 0, 0, 0.1)" minH="70px"></Box>
              </Box> */}
            </Box>
          </Flex>

          <Flex
            flexShrink={0}
            alignSelf="center"
            d={{ base: "none", lg: "flex" }}
            w={{ lg: "550px", xl: "600px" }}
            h={{ lg: "450px", xl: "400px" }}
            pos="relative"
          >
            <Image
              pos="absolute"
              w="100%"
              h="100%"
              src="/images/lg/bann1.jpg"
              boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
            />
          </Flex>
        </Flex>
      </Section>

      {/* Why Patronize us? */}
      <Section bg="gray.700" color="white" px={6} pt={20} pb={{ base: 0, lg: 20 }}>
        <Flex maxW={{ lg: "1150px", xl: "1200px" }} mx="auto">
          <Heading type="h2" color="white" maxW="400px">
            Why Patronize us? Learn More
          </Heading>
        </Flex>
      </Section>

      {/* Buy Now, Pay Later from any Mobile */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            order={{ base: 0, md: 1 }}
            ml={{ md: 10, lg: 16 }}
            rounded="md"
          >
            <Image
              src="/images/lg/bann5.jpg"
              w={{ base: "280px", md: "325px", lg: "325px", xl: "525px" }}
              h={{ base: "205px", md: "300px", lg: "300px", xl: "600px" }}
              boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign="left" maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10} maxW="450px">
              Place your orders Now!!, Pay Later from any Mobile.
            </Heading>

            <Box color="brand.black1">
              <Text type="lg-regular" mb={6}>
                War Times are near. Fight with Vladimir Putin agaist Nato and their allies even if putin will fail. 
                Pay as low as{" "}
                <Text type="lg-bold" as="span">
                  {formatPrice("en-US", 100000, "USD").replace(".00", "")}
                </Text>{" "}
                instamentally upon initial deposit settlement using our ussd
                code{" "}
                <Text type="lg-bold" as="span">
                  *000#
                </Text>
                , on any mobile phone. Become a war loard.
              </Text>

              <Link href="/terms" color="brand.primary">
                Terms and conditions apply
              </Link>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Earn as a marketer, Earn as a customer */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
            //
          >
            <Image
              src="/images/lg/bann6.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
              War Front Machines.
            </Heading>

            <Box color="brand.black1">
              <Text mb={6} type="lg-regular">
                Get the best offer for war machines, delivery supplies as low as{" "}
                <Text type="lg-bold" as="span">
                  5%
                </Text>{" "}
                Get commission when the people you refer buy our products, using your referral code.
                As a customer, you can also earn a{" "}
                <Text type="lg-bold" as="span">
                  3%
                </Text>{" "}
                commission when the people you refer to us make a purchase. Commission from referrals are payable into your
                virtual wallet.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Online and offline store */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            order={{ base: 0, md: 1 }}
            ml={{ md: 10, lg: 16 }}
          >
            <Image
              src="/images/lg/bann3.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign="left" maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10} maxW="450px">
              Online and Offline Stores for your Convenience.
            </Heading>

            <Box color="brand.black1">
              <Text type="lg-regular" mb={6}>
                With an average daily offline purchase power of 5640, we remain
                your trusted companion for quality and affordable products. We
                bring quality and affordability closer to your home(s).
              </Text>
            </Box>

            <Box pt={8}>
              <Link mute href="/store">
                <Button variant="primary" mb={8}>
                  Explore our Products
                </Button>
              </Link>

              <Link
                href="/locations"
                d="flex"
                w="fit-content"
                alignItems="center"
                color="brand.primary"
              >
                <Text mb={0} mr={2}>
                  Locate a store near you
                </Text>

                <AiOutlineRight />
              </Link>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer Satisfaction and Guarantee */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
          >
            <Image
              src="/images/lg/bann2.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
               boxShadow="50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
              Death Row Satisfaction and Guarantee.
            </Heading>

            <Box color="brand.black1" type="lg-regular">
              <Text mb={6} type="lg-regular">
                With over 13 years trading with war gadgets experience, we provide{" "}
                <Text as="span" type="lg-bold">
                  100%
                </Text>{" "}
                quality working products, certified by over{" "}
                <Text as="span" type="lg-bold">
                  1k+
                </Text>{" "}
                customers. Our word is indeed our bond come experience yourself.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer stories */}
      <Section px={6} py={20} maxW={breakpoints.xxl}>
        <Box as="header" maxW={breakpoints.xl} mx="auto">
          <Heading type="h3" textAlign="center" color="brand.secondary">
            What our customers <br />are saying
          </Heading>

          <Text
            my={16}
            type="md-bold"
            d={{ base: "block", md: "none" }}
            type="md-regular"
          >
            The Idea of killing the enemy with his own weapon is just what i needed to take out the Russians Soldiers 
            on Ukraine's soil
          </Text>
        </Box>

        <Box as="main">
          <Flex overflowX="scroll" justifyContent="center" alignItems="center" px={{ md: 2 }} pb={5}>
            <CustomerReview />
            <CustomerReview />
            <CustomerReview />
          </Flex>
        </Box>
      </Section>


     

    </Layout>
  );
};

export default LandingPage;

