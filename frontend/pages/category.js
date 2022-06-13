import { ButtonGroup } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import {
  Accordion,
  Button,
  Dropdown,
  DropdownContent,
  Heading,
  IconButton,
  ProductCards,
  Ratings,
  Text,
  TextField,
  ProductListCard,
  ProductBoxedCard,
  Modal,
  Pagination,
} from "components/shared/lib";
import {
  headerHeight,
  Layout,
  Loader,
  Section,
  SomethingWentWrong,
} from "components/components/pages";
import useCart from "hooks/useCart";
import useCategories from "hooks/useCategories";
import usePagination from "hooks/usePagination";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BiCaretDown, BiSort } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { IoFilterOutline } from "react-icons/io5";
import buildSEO from "utils/buildSEO";
import createRange from "utils/createRange";
import http from "utils/http";

const pageSEO = buildSEO("Categories", "Description ...");

const Aside = ({
  router,
  category,
  defaultIndex,
  onCloseModal,
  fetchProducts,

  priceFromValue,
  setPriceFromValue,
  priceToValue,
  setPriceToValue,
  rating,
  setRating,
}) => {
  const CategoryContent = () => {
    const handleCategoryChange = (queryString) => {
      router.replace(`category?${queryString}`);

      onCloseModal?.();
    };

    const getActiveControl = (condition) =>
      condition
        ? { color: "brand.primary", bg: "brand.primaryLight", disabled: true }
        : {};

    const controlProps = (condition, queryString) => ({
      // Active state
      ...getActiveControl(condition), //
      onClick: handleCategoryChange.bind(null, queryString),
      _hover: { bg: "brand.gray6" },
      as: "button",
    });

    return (
      <Box py={5}>
        <Text
          {...controlProps(!router.query.subCategory, category.queryString)}
          mute
          type="nm-bold"
          textTransform="capitalize"
          px={2}
          px={{ base: 2, md: 5 }}
        >
          {category.name}
        </Text>

        <Flex flexDir="column">
          {category.subCategories.map((subCategory) => (
            <Box
              {...controlProps(
                router.query.subCategory === subCategory.slug,
                subCategory.queryString
              )}
              key={subCategory.id}
              textAlign="left"
              pl={{ base: 3, md: 6 }}
              pr={2}
              py={1}
            >
              <Text mute textTransform="capitalize">
                {subCategory.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  };

  const PriceContent = () => {
    const [values, setValues] = useState({
      to: `${priceToValue}`,
      from: `${priceFromValue}`,
    });

    const [hasApply, setHasApply] = useState(false);

    const handleType = ({ target: { value, id } }) => {
      setValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("filter category by price", values.from, "to", values.to);

      setPriceToValue(values.to);
      setPriceFromValue(values.from);

      setHasApply(true);

      onCloseModal?.();
    };

    useEffect(() => {
      if (hasApply) {
        fetchProducts();
        setHasApply(false);
      }
    }, [hasApply]);

    // fetchProducts();

    return (
      <Box as="form" onSubmit={handleSubmit} py={5} px={{ base: 2, md: 5 }}>
        <Flex>
          <TextField
            label="from"
            id="from"
            value={values.from}
            onChange={handleType}
            type="number"
          />

          <TextField
            label="to"
            id="to"
            value={values.to}
            onChange={handleType}
            formGroup={{ ml: 1 }}
            type="number"
          />
        </Flex>

        <Box textAlign="right" mb={2}>
          <Button sm variant="primary" type="submit">
            Apply
          </Button>
        </Box>
      </Box>
    );
  };

  const RatingsContent = () => {
    const ratings = [{ value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];

    const handleRatingChange = (rating) => {
      setRating(+rating);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("filter category by rating", rating);

      fetchProducts();

      onCloseModal && onCloseModal();
    };

    return (
      <Box as="form" onSubmit={handleSubmit} py={5} px={{ base: 2, md: 5 }}>
        <RadioGroup
          onChange={handleRatingChange}
          value={rating}
          w="100%"
          mb={6}
          colorScheme="green"
        >
          <Stack spacing={3}>
            {ratings.map((rating) => (
              <Radio value={rating.value} key={rating.value}>
                <Flex alignItems="center" cursor="pointer">
                  {/* Mobile */}
                  <Box d={{ base: "block", lg: "none" }}>
                    <Ratings
                      mr={2}
                      color="brand.primary"
                      value={rating.value}
                      sm
                    />
                  </Box>

                  {/* From Desktops */}
                  <Box d={{ base: "none", lg: "block" }}>
                    <Ratings
                      mr={2}
                      color="brand.primary"
                      value={rating.value}
                    />
                  </Box>

                  <Text mute>& Above</Text>
                </Flex>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        <Box textAlign="right" mb={2}>
          <Button sm variant="primary" type="submit">
            Apply
          </Button>
        </Box>
      </Box>
    );
  };

  const asideList = category && [
    {
      header: "category",
      content: <CategoryContent />,
    },
    {
      header: "price",
      content: <PriceContent />,
    },
    {
      header: "ratings",
      content: <RatingsContent />,
    },
  ];

  const renderContent = category && (
    <Accordion
      data={asideList}
      contentProps={{ p: 1 }}
      headerProps={{
        textTransform: "uppercase",
        borderBottom: "1px",
        borderColor: "brand.gray6",
      }}
      allowMultiple
      defaultIndex={defaultIndex || createRange(asideList.length)}
    />
  );

  return (
    <Box
      flexShrink={0}
      w={{ base: "auto", md: "230px", lg: "250px" }}
      as="aside"
      alignSelf="flex-start"
      rounded={{ base: "none", md: "md" }}
      overflow="hidden"
      bg="brand.white"
      py={2}
    >
      {renderContent}
    </Box>
  );
};

const LayoutProductCards = ({ products, cart, layout, onPageChange, page }) => {
  const renderCard = (product) => {
    const cardProps = {
      data: product,
      cart,
    };

    return layout === "grid" ? (
      <ProductBoxedCard {...cardProps} w="auto" />
    ) : (
      <ProductListCard {...cardProps} />
    );
  };

  return (
    <Box pb={5}>
      <Grid
        py={5}
        rowGap={5}
        templateColumns={
          layout === "grid"
            ? {
                base: "1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr 1fr",
              }
            : "1fr"
        }
        as="main"
      >
        {products.map((product) => (
          <GridItem key={product.id}>{renderCard(product)}</GridItem>
        ))}
      </Grid>
      <Pagination
        page={page}
        onPageChange={onPageChange}
        itemTotal={products.length}
        pageTotal={1}
      />
    </Box>
  );
};

const MainArea = ({
  title = "sink and water",
  products,
  children,
  sortBy,
  setSortBy,
  fetchProducts,
  onPageChange,
  page,
}) => {
  const cart = useCart();
  const [currentLayoutStyle, setCurrentLayoutStyle] = useState("grid");

  const handleSortBy = (text) => {
    setSortBy(text);

    fetchProducts();
  };

  const sortByDropdownList = [
    {
      text: "Latest",
      onClick: handleSortBy.bind(null, "Latest"),
    },
    {
      text: "Price: low to high",
      onClick: handleSortBy.bind(null, "Price: low to high"),
    },
    {
      text: "Price: high to low",
      onClick: handleSortBy.bind(null, "Price: high to low"),
    },
  ];

  const handleLayoutStyleChange = (id) => setCurrentLayoutStyle(id);

  const layoutStyleList = [
    { id: "grid", icon: <BsGridFill /> },
    { id: "list", icon: <ImList /> },
  ];

  const renderedContent = (
    <Box as="section">
      <Box as="header">
        <Flex
          py={2}
          color="brand.secondary"
          justifyContent="space-between"
          alignItems={{ base: "stretch", md: "center" }}
          px={2}
          flexDir={{ base: "column", md: "row" }}
        >
          <Heading
            type="h4"
            textTransform="capitalize"
            mute
            borderBottom={{ base: "1px", md: "none" }}
            borderColor="brand.gray5"
            mb={{ base: 2, md: 0 }}
          >
            {title}
          </Heading>

          <Flex justifyContent="flex-end">
            <Box pos="sticky" top={headerHeight}>
              {children}
            </Box>

            <Dropdown
              renderTrigger={({ onClick }) => (
                <Button
                  responsive={<BiSort />}
                  leftIcon={<BiSort />}
                  rightIcon={<BiCaretDown />}
                  onClick={onClick}
                  sm
                >
                  sort by: {sortBy}
                </Button>
              )}
            >
              <DropdownContent list={sortByDropdownList} />
            </Dropdown>
          </Flex>
        </Flex>

        <Flex
          py={2}
          justifyContent="space-between"
          alignItems="center"
          px={2}
          borderTop="1px"
          borderBottom="1px"
          borderColor="brand.gray5"
        >
          <Text mute>
            <Text mr={2} as="span" color="brand.primary" type="nm-bold">
              {products.total}
            </Text>
            products found
          </Text>

          <ButtonGroup>
            {layoutStyleList.map((layout) => (
              <IconButton
                key={layout.id}
                variant="ghost"
                isRound={false}
                opacity={0.7}
                onClick={handleLayoutStyleChange.bind(null, layout.id)}
                //
                // Active styles
                {...(layout.id === currentLayoutStyle
                  ? {
                      bg: "brand.primaryLight",
                      color: "brand.primary",
                      opacity: 1,
                    }
                  : {})}
              >
                {layout.icon}
              </IconButton>
            ))}
          </ButtonGroup>
        </Flex>
      </Box>

      {products.loading ? (
        <Loader h="300px" />
      ) : products.error ? (
        <SomethingWentWrong h="300px" onRetry={fetchProducts} />
      ) : products.total === 0 ? (
        <SomethingWentWrong message="No products found!" h="300px" />
      ) : (
        <LayoutProductCards
          products={products.data}
          cart={cart}
          layout={currentLayoutStyle}
          onPageChange={onPageChange}
          page={page}
        />
      )}
    </Box>
  );

  return (
    <Box
      flex={1}
      as="main"
      minH="300px"
      ml={{ base: 0, md: 5 }}
      rounded="md"
      shadow="md"
      bg="brand.white"
    >
      {renderedContent}
    </Box>
  );
};

const CategoriesPage = () => {
  const router = useRouter();
  const toast = useToast();

  // Other Filtration states
  const [priceFromValue, setPriceFromValue] = useState(100);
  const [priceToValue, setPriceToValue] = useState(50000);
  const [rating, setRating] = useState(1);
  const [sortBy, setSortBy] = useState("Latest");

  // Initiate values
  useEffect(() => {
    const ls_data =
      localStorage.getItem && JSON.parse(localStorage.getItem("category-page"));

    const values = [
      {
        value: ls_data?.minPrice,
        setter: (value) => setPriceFromValue(value),
      },
      { value: ls_data?.maxPrice, setter: (value) => setPriceToValue(value) },
      { value: ls_data?.minRating, setter: (value) => setRating(value) },
      { value: ls_data?.sortBy, setter: (value) => setSortBy(value) },
    ];

    values.forEach(({ value, setter }) => {
      if (value) {
        setter(value);
      }
    });
  }, []);

  // Set values to query
  useEffect(() => {
    if (router.query.category) {
      const queries = [
        { key: "sub-category", value: router.query.subCategory },
        { key: "minPrice", value: priceFromValue },
        { key: "maxPrice", value: priceToValue },
        { key: "minRating", value: rating },
        { key: "sortBy", value: sortBy },
      ];

      let ls_data = {};

      const queryString = queries.reduce((prev, query, index) => {
        // console.log(query, index);

        if (query.value) {
          ls_data = { ...ls_data, [query.key]: query.value };

          return (
            prev +
            `${query.key}=${`${query.value}`.replace(/\s/g, "-")}${
              index < queries.length - 1 ? "&" : ""
            }`
          );
        }

        return "";
      }, "");

      const path = `/category?category=${router.query.category}&${queryString}`;

      localStorage.setItem("category-page", JSON.stringify(ls_data));

      router.replace(path);
    }
  }, [
    priceFromValue,
    priceToValue,
    rating,
    sortBy,
    router.query.category,
    router.query.subCategory,
  ]);

  const pagination = usePagination();

  // END OF Other Filtration states

  const fetchProducts = useCallback(async () => {
    // Loading state
    setProducts(null);

    try {
      const {
        data: { data },
      } = await http.get(
        `/products/?category=${
          router.query.subCategory || router.query.category
        }&page=${
          pagination.page
        }&price[gte]=${priceFromValue}&price[lte]=${priceToValue}&rating[gte]=${rating}&rating[lte]=5&sortBy=${sortBy}`
      );

      const products = {
        data: data.docs.map((product) => ({
          ...product,
          title: product.name,
          ratings: 1,
        })),

        limit: data.limit,
        page: data.page,
        pages: data.pages,
        total: data.total,
      };

      // Success state
      setProducts(products);
    } catch (err) {
      toast.displayToast({
        description: err.message,
      });

      // Error state
      setProducts(0);
    }
  });

  // Category handlers

  const categories = useCategories();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    if (categories.data) {
      // TODO: find category with `category form router`
      const category = categories.data.find(
        (category) => category.slug === router.query.category
      );

      setCategory(category);
    }
  }, [categories.data, router.query.category]);

  useEffect(() => {
    if (category && router.query.subCategory) {
      // TODO: find category with `category form router`
      const subCategory = category.subCategories.find(
        (subCategory) => subCategory.slug === router.query.subCategory
      );

      setSubCategory(subCategory);
    } else {
      setSubCategory(null);
    }
  }, [category, router.query.subCategory]);

  useEffect(() => {
    if (router.query.subCategory || router.query.category) {
      fetchProducts();
    }
  }, [router.query.subCategory, router.query.category, pagination.page]);

  // END OF Category handlers

  // Product handlers
  const [products, setProducts] = useState(null);

  const mainAreaTitle = subCategory ? subCategory.name : category?.name;

  // useEffect(() => {
  // }, []);
  // END OF Product handlers

  const breadcrumb = subCategory
    ? [
        { text: category?.name, link: `category?${category.queryString}` },
        { text: subCategory.name },
      ]
    : [{ text: category?.name }];

  const renderAside = (props) => (
    <Aside
      router={router}
      category={category}
      fetchProducts={fetchProducts}
      priceFromValue={priceFromValue}
      setPriceFromValue={setPriceFromValue}
      priceToValue={priceToValue}
      setPriceToValue={setPriceToValue}
      rating={rating}
      setRating={setRating}
      {...props}
    />
  );

  return (
    <Layout SEO={pageSEO} breadcrumb={breadcrumb}>
      {/* <ProductCards mt={{ base: 5, md: 0 }} sm title="Most searched products" /> */}

      <Section pt={5} pb={10}>
        {categories.loading ? (
          <Loader />
        ) : categories.error ? (
          <SomethingWentWrong />
        ) : (
          category && (
            <Flex alignItems="flex-start">
              {/* From Tab */}
              <Box d={{ base: "none", md: "block" }}>{renderAside()}</Box>

              <MainArea
                products={{
                  ...(products ? products : {}),
                  loading: products === null,
                  error: products === 0,
                }}
                sortBy={sortBy}
                setSortBy={setSortBy}
                fetchProducts={fetchProducts}
                title={mainAreaTitle}
                onPageChange={pagination.handlePageChange}
                page={pagination.page}
              >
                 {/* Aside For Mobile viewers */}
                <Box d={{ base: "block", md: "none" }} mr={2}>
                  <Modal
                    bodyProps={{ px: 0, pt: 10 }}
                    renderTrigger={({ handleOpen }) => (
                      <Button
                        responsive={<IoFilterOutline />}
                        leftIcon={<IoFilterOutline />}
                        rightIcon={<BiCaretDown />}
                        onClick={handleOpen}
                        sm
                      ></Button>
                    )}
                  >
                    {({ handleClose }) =>
                      renderAside({
                        onCloseModal: handleClose,
                      })
                    }
                  </Modal>
                </Box>
              </MainArea>
            </Flex>
          )
        )}
      </Section>
    </Layout>
  );
};

export default CategoriesPage;
