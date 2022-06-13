import { Box, Flex } from "@chakra-ui/layout";
import { Layout, Section } from "components/components/pages";
import { Text, Heading, ProductCards } from "components/shared/lib";
import breakpoints from "theme/breakpoints";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const StorePage = () => {
  return (
    <Layout
      // SEO={pageSEO}
      withFooterEmailSection
      bg="brand.gray6"
    >
      {/* Carousel */}
      <Section maxW={3000} mb={20} px={0}>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box h={{ base: "300px", md: "500px" }} bg="brand.error"></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box h={{ base: "300px", md: "500px" }} bg="brand.info"></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box h={{ base: "300px", md: "500px" }} bg="brand.success"></Box>
          </SwiperSlide>
        </Swiper>

        {/* <Fader dots key={false}>
          <Box h={{ base: "300px", md: "500px" }} bg="brand.gray4"></Box>
          <Box h={{ base: "300px", md: "500px" }} bg="brand.error"></Box>
          <Box h={{ base: "300px", md: "500px" }} bg="brand.success"></Box>
        </Fader> */}
      </Section>

      {/* Popular Brands */}
      <Section mb={20} px={6}>
        <Box>
          <Heading type="h6" mb={3}>
            popular brands
          </Heading>

          <Box bg="brand.white" minH="100px"></Box>
        </Box>
      </Section>

      {/* Product Cards */}
      <ProductCards mb={10} />
      {/* Product Cards */}
      <ProductCards mb={10} />

      {/* Banner */}
      <Section
        maxW={{ base: breakpoints.xxl, md: breakpoints.xl }}
        px={{ base: 0, md: 6 }}
        mb={20}
      >
        <Box h={{ base: "250px", md: "350px" }} bg="brand.white"></Box>
      </Section>

      {/* Product Cards */}
      <ProductCards mb={10} />

      {/* Last Section */}
      <Section>
        <Flex py={10} bg="brand.white" flexDir={{ base: "column", md: "row" }}>
          <Box px={10}>
            <Heading mb={{ base: 0, md: 5 }}>Delivery</Heading>

            <Text>
              Our courier delivery will safely deliver your order right next to
              your door
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Warranty</Heading>

            <Text>
              Certified equipment with on official guarantee from the
              manufacturer.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Payment</Heading>

            <Text>
              You can pay for your purchase in cash, by card, by bank transfer
              or installmentally.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Return</Heading>

            <Text>
              Returns are made within 14 days after purchase, in accordance with
              applicable law.
            </Text>
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

export default StorePage;
