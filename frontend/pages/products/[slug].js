import { Badge, Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Layout, Loader, Section, SomethingWentWrong } from "components/components/pages";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import {
  Heading,
  Text,
  Tab,
  Ratings,
  TextField,
  Image,
  BuyItem,
  Icon,
  ProductCards,
  RecentlyViewed,
} from "components/shared/lib";
import breakpoints from "theme/breakpoints";
import formatPrice from "utils/formatPrice";
import http from "utils/http";
import useCart from "hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import {
  Fader,
  ThemeProvider as FaderThemeProvider,
} from "react-rapid-carousel";
import colors from "theme/colors";
import { useToast } from "@chakra-ui/toast";

const Table = ({ rows }) => (
  <Box>
    {rows.map((row, index) => (
      <Grid
        key={row.id}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        pb={{ base: 3, md: 6 }}
        pt={{ base: 0, md: 6 }}
        borderTop="1px"
        borderColor={index ? "brand.gray4" : "transparent"}
      >
        <GridItem>
          {/* Mobile */}
          <Text type="nm-bold" d={{ base: "block", md: "none" }}>
            {row.header}
          </Text>
          {/* From Tab */}
          <Text mute type="md-bold" d={{ base: "none", md: "block" }}>
            {row.header}
          </Text>
        </GridItem>

        <GridItem>
          <Grid templateColumns="1fr 1fr" rowGap={4}>
            {row.columns.map((column, index) => (
              <GridItem key={index}>
                <Text mb={1} type="sm-bold">
                  {column.header}
                </Text>
                <Text mute type="sm-regular">
                  {column.content}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    ))}
  </Box>
);

const Gallery = ({ product }) => {
  const allImages = product.images || [];

  return (
    product && (
      <>
        {/* For Mobile */}
        <Box d={{ base: "block", md: "none" }}>
          <FaderThemeProvider
            theme={{
              dots: { 1: colors.brand.primary, 2: colors.brand.primaryLight },
              carets: { 1: colors.brand.secondary, 2: colors.brand.white },
            }}
          >
            <Fader dots buttons>
              {allImages.map((image, index) => (
                <Flex justifyContent="center" key={index}>
                  <Image w="280px" h="230px" isProduct src={image.imageUrl} />
                </Flex>
              ))}
            </Fader>
          </FaderThemeProvider>
        </Box>

        {/* From Tab */}
        <Box d={{ base: "none", md: "block" }}>
          <Image w="250px" h="200px" isProduct src={allImages[0]?.imageUrl || "/images/lg/tv-image.png"} />

          {product.images.length ? (
            <Flex overflowX="auto" w="250px" py={2}>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  w="100px"
                  h="100px"
                  isProduct
                  mr={3}
                  src={image.imageUrl}
                />
              ))}
            </Flex>
          ) : null}
        </Box>
      </>
    )
  );
};

const ProductDetailPage = ({ product }) => {
  const pageSEO = product
    ? buildSEO(product.name || "Product Error", product.description)
    : buildSEO(
        "Product Loading",
        "this product is being fetched from the server. please wait"
      );
  const breadcrumb = product &&
    !product.err && [
      {
        text: product.category.name,
        link: `/categories/${product.category.slug}`,
      },
      { text: product.name },
    ];

  const tabDescriptionContent = <Box mt={10}>{product?.description}</Box>;

  const specificationsTableRows = [
    {
      id: "type",
      header: "Type",
      columns: [
        { header: "Product Type", content: "Convention" },
        { header: "installment Type", content: "Freestanding" },
      ],
    },
    {
      id: "capacity",
      header: "Capacity",
      columns: [{ header: "Oven Capacity", content: "35L" }],
    },
    {
      id: "material-finishes",
      header: "Material/Finishes",
      columns: [
        { header: "Color (Door)", content: "Clean Charcoal" },
        { header: "Color (Cabinet)", content: "Black" },
        { header: "Control Method", content: "Full Touch" },
        { header: "Door Type", content: "Drop Down" },
        { header: "Displace Type", content: "LED (White)" },
        { header: "Turnable size", content: "380mm" },
      ],
    },
    {
      id: "power-ratings",
      header: "Power/Ratings",
      columns: [
        { header: "Power Source", content: "230V/50HZ" },
        { header: "Output Power (Microwave)", content: "900W" },
        { header: "Power Consumption (Microwave)", content: "1459W" },
        { header: "Power Consumption (Grill)", content: "2250W" },
        { header: "Power Consumption (Convection)", content: "2500W" },
        { header: "Power Consumption (Max)", content: "2950" },
      ],
    },
  ];

  const tabSpecificationsContent = (
    <Box mt={10}>
      <Table rows={specificationsTableRows} />
    </Box>
  );

  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(1);
  const toast = useToast();
  const handleRatingChange = (rating) => setRating(rating);

  const doSubmit = async (_fieldsObj) => {
    const body = {
      // message: fieldsObj.message,
      productId: product.id,
      rating,
    };

    try {
      await http.post("/product-reviews", body);
    } catch (err) {
      toast({
        status: "error",
        position: "top",
        description: err.message,
        duration: 3 * 1000,
      });
    }
  };
  const initialFieldsProps = [
    {
      id: "message",
      label: "Message",
      textarea: true,
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      if (product?.id) {
        try {
          const {
            data: {
              data: { docs },
            },
          } = await http.get(`/products/${product.id}/reviews?limit=5&page=1`);

          setReviews(docs);
        } catch (err) {}
      }
    };

    fetchReviews();
  }, [product?.id]);

  const { formProps, renderSubmitBtn, fieldsProps, handleType } = useForm({
    doSubmit,
    initialFieldsProps,
  });

  const renderStars = (value) => (
    <>
      <Ratings
        value={value}
        mr={6}
        flexShrink={0}
        sm
        d={{ base: "flex", md: "none" }}
      />
      <Ratings
        value={value}
        mr={6}
        flexShrink={0}
        d={{ base: "none", md: "flex" }}
      />
    </>
  );
  const renderStarsBox = ({ starValue, progressValue }) => (
    <Flex
      mb={4}
      alignItems="center"
      justifyContent="space-between"
      w={{ base: "250px", md: "350px" }}
    >
      {renderStars(starValue)}

      <Progress
        w="200px"
        colorScheme="blackAlpha"
        rounded="lg"
        size="sm"
        value={progressValue}
      />
    </Flex>
  );
  const tabReviewsContent = (
    <Box mt={10}>
      <Flex
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box maxW="500px">
          <Text type="md-bold">Based on ({reviews?.length || 0}) reviews</Text>

          <Box>
            <Heading type="h2" as="h4" mb={0}>
              4.3
            </Heading>
            <Text type="lg-regular">Overall</Text>
          </Box>

          <Box>
            {renderStarsBox({ starValue: 5, progressValue: 80 })}
            {renderStarsBox({ starValue: 4, progressValue: 35 })}
            {renderStarsBox({ starValue: 3, progressValue: 10 })}
            {renderStarsBox({ starValue: 2, progressValue: 0 })}
            {renderStarsBox({ starValue: 1, progressValue: 60 })}
          </Box>
        </Box>

        <Box
          ml={{ md: 10 }}
          my={{ base: 10, md: 0 }}
          flexBasis="100%"
          maxW="400px"
        >
          <Text type="md-bold">Add your Review</Text>

          <Box as="form" {...formProps} color="brand.secondary">
            {fieldsProps.map((field) => (
              <TextField key={field.id} onChange={handleType} {...field} />
            ))}

            <Box mb={10}>
              <Text mute type="nm-bold">
                Choose your Rating
              </Text>
              <Ratings
                lg
                onChange={handleRatingChange}
                value={rating}
                color="brand.secondary"
              />
            </Box>

            {renderSubmitBtn({
              text: "Publish",
              variant: "secondary",
              rightIcon: <FaPen />,
            })}
          </Box>
        </Box>
      </Flex>

      <Box mt={10}>
        {reviews === null ? (
          <Loader />
        ) : reviews ? (
          reviews.map((reviews, index) => (
            <Box key={index} borderTop="1px" borderColor="brand.gray4" py={5}>
              <Ratings value={4} mb={5} />

              <Text>
                Enjoy healthier fried food with the Air Fry technology. It
                combines the use of hot air circulation and the heated Crusty
                Plate to give you healthier crispy bites with only a touch of
                oil, saving you the hassle of cleaning up any greasy pans or oil
                splatters!
              </Text>

              <Flex alignItems="center">
                <Text mute type="nm-bold" mr={3}>
                  Anna Stanley
                </Text>
                <Text mute type="sm-regular">
                  On Monday 14 Feb, 2021
                </Text>
              </Flex>
            </Box>
          ))
        ) : (
          <SomethingWentWrong />
        )}
      </Box>
    </Box>
  );

  const router = useRouter();
  const cart = useCart();

  // User viewed this Product
  useEffect(() => {
    const viewedProduct = async () => {
      if (!router.isFallback) {
        if (!product.err) {
          try {
            await http.patch("/user-product-views", {
              productId: product.id,
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    viewedProduct();
  }, [router.isFallback, product?.id]);

  const tabData = [
    {
      header: "Description",
      content: tabDescriptionContent,
    },
    { header: "Specifications", content: tabSpecificationsContent },
    { header: "Reviews", content: tabReviewsContent },
  ];

  const renderBuyButton = ({ showHeader, ...rest }) => (
    <Box w="100%" {...rest}>
      <BuyItem
        inCartLabel={
          showHeader && (
            <Heading mute type="h6">
              Already in cart
            </Heading>
          )
        }
        cart={cart}
        item={product}
        w="100%"
        text="Add To Cart"
      />
    </Box>
  );

  return (
    <Layout
      SEO={pageSEO}
      breadcrumb={breadcrumb}
      headerBg="brand.white"
      bg="brand.gray6"
      footerProps={{
        pb: "90px",
      }}
    >
      {
        // Fetching product for the server
        router.isFallback ? (
          <Section>
            <Loader />
          </Section>
        ) : // Error occurred
        product.err ? (
          <Section>
            <SomethingWentWrong />
          </Section>
        ) : (
          // No errors
          <>
            <Section pt={{ base: 5, md: 10 }} pb={10}>
              <Flex
                justifyContent="center"
                flexDir={{ base: "column", md: "row" }}
              >
                {/* Gallery */}
                <Gallery product={product} />

                <Box
                  maxW="500"
                  ml={{ md: 10, lg: 16, xl: 20 }}
                  color="brand.gray"
                >
                  {/* From Mobile */}
                  <Text
                    d={{ base: "block", md: "none" }}
                    color="brand.black2"
                    type="nm-bold"
                    as="h1"
                    color="brand.secondary"
                    mute
                  >
                    {product.name}
                  </Text>
                  {/* From Tab */}
                  <Heading
                    d={{ base: "none", md: "block" }}
                    color="brand.black2"
                    type="h3"
                    as="h1"
                    color="brand.secondary"
                    mute
                  >
                    {product.name}
                  </Heading>

                  <Box>
                    <Flex alignItems="center" mb={2}>
                      {/* Mobile */}
                      <Ratings
                        value={product.ratings || 3.8}
                        color="brand.primary"
                        d={{ base: "flex", md: "none" }}
                        sm
                      />
                      {/* Tab */}
                      <Ratings
                        value={product.ratings || 3.8}
                        color="brand.primary"
                        d={{ base: "none", md: "flex" }}
                      />
                      <Text mute ml={2}>
                        Reviews ({product.reviews || 4})
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <Text mute mr={2}>
                        Available:
                      </Text>

                      <Badge colorScheme="green" fontSize=".8rem">
                        in stock
                      </Badge>
                    </Flex>
                  </Box>

                  <Box>
                    {/* Mobile */}
                    <Heading
                      color="brand.secondary"
                      type="h5"
                      as="p"
                      d={{ base: "block", md: "none" }}
                    >
                      {formatPrice("en-NG", product.price || 200340.99, "NGN")}
                    </Heading>
                    {/* Tab */}
                    <Heading
                      color="brand.secondary"
                      type="h4"
                      as="p"
                      d={{ base: "none", md: "block" }}
                    >
                      {formatPrice("en-NG", product.price || 200340.99, "NGN")}
                    </Heading>
                  </Box>

                  <Flex
                    // justifyContent="space-between"
                    justifyContent={{ md: "flex-end" }}
                    mb={3}
                  >
                    {/* <Box>
                    <Text mb={2}>Quantity</Text>

                    <Counter  />
                  </Box> */}

                    <Box>
                      <Text mb={2}>Color</Text>

                      <Flex>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          bg="brand.success"
                          w="50px"
                          h="50px"
                          _hover={{
                            transform: "scale(1.1)",
                            cursor: "pointer",
                          }}
                        >
                          <Icon
                            bg="brand.white"
                            color="brand.secondary"
                            rounded="full"
                          >
                            <MdCheckCircle />
                          </Icon>
                        </Flex>
                        <Box
                          bg="brand.error"
                          w="50px"
                          h="50px"
                          _hover={{
                            transform: "scale(1.1)",
                            cursor: "pointer",
                          }}
                          mx={2}
                        ></Box>
                        <Box
                          bg="brand.gray3"
                          w="50px"
                          h="50px"
                          _hover={{
                            transform: "scale(1.1)",
                            cursor: "pointer",
                          }}
                        ></Box>
                      </Flex>
                    </Box>
                  </Flex>

                  {renderBuyButton({ d: { base: "none", md: "block" } })}
                </Box>
              </Flex>
            </Section>

            <Section
              maxW={breakpoints.xxl}
              // mx={6}
              px={{ base: 0, md: 6 }}
              py={4}
              mb={10}
              rounded="md"
            >
              <Box
                maxW={breakpoints.xl}
                mx="auto"
                px={{ base: 2, md: 6 }}
                bg="brand.white"
                rounded="md"
              >
                <Tab
                  data={tabData}
                  responsive={{ defaultIndex: 0 }}
                  bg="brand.white"
                />
              </Box>
            </Section>

            {/* Footer for Mobile */}
            <Section
              d={{ base: "block", md: "none" }}
              w="100%"
              p={2}
              bg="white"
              pos="fixed"
              bottom={0}
              left={0}
              zIndex={50}
              boxShadow="0 -3px 3px rgba(0, 0, 0, 0.08), 0 -6px 6px rgba(0, 0, 0, 0.1)"
            >
              {renderBuyButton({ showHeader: true })}
            </Section>

            <RecentlyViewed pb={20} />
          </>
        )
      }
    </Layout>
  );
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  // const {
  //   data: { product },
  // } = await Http.get(`/products/${slug}`);

  let product;

  try {
    const {
      data: { data },
    } = await http.get(`/products/${slug}/details`);

    product = data;
  } catch (err) {
    console.log(err);

    product = { err: err.message };
  }

  return {
    props: {
      product,
    },
  };
};
export const getStaticPaths = async () => {
  // let allData = await Promise.all([http.get("/products")]);

  // allData = allData.map(({ data: axiosData }) =>
  //   axiosData.data.map((product) => {
  //     return { params: { slug: product.slug } };
  //   })
  // );

  // const paths = allData.reduce((previous, current) => {
  //   return (previous = [...previous, ...current]);
  // }, []);

  const paths = [];

  return {
    fallback: true,
    paths,
  };
};

export default ProductDetailPage;
