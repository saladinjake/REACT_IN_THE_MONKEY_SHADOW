import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import {
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import {
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  TextField,
  VerticalStepper,
  VerticalStepperResetButton,
  Ratings,
  Pagination,
  RichText,
} from "components/lib";
import { Layout, Loader, Section, SomethingWentWrong } from "components/pages";
import useForm from "hooks/useForm";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { FcElectronics } from "react-icons/fc";
// import { GiCardDiscard } from "react-icons/gi";
import { BiEdit, BiPlus } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  IoCheckmarkDone,
  IoFastFoodOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdUpdate } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import { ImageUpload } from "components/pages/Products/ImageUpload";
import usePagination from "hooks/usePagination";
import breakpoints from "theme/breakpoints";
import useRichText from "hooks/useRichText";
import { getConvertedStringJson } from "utils/richText";

// TODO: disable Submit? nothing has been typed? add an extra type handler.

const ProductsPage = ({ productData, err }) => {
  const router = useRouter();

  const [uploadRequestLoading, setUploadRequestLoading] = useState();
  const [editMode, setEditMode] = useState();
  const [product, setProduct] = useState(productData);

  const description_richText = useRichText(product?.description);

  // ================Remove-------------

  const setProductData = (newData) => {
    setProduct((prev) => ({ ...prev, ...newData }));
  };
  const resetProduct = () => {
    setProduct({});
  };

  useEffect(() => {
    if (router.query.id && router.query.id !== "add") {
      setEditMode(router.query.id);
    }
  }, [router.query.id]);

  const pageSEO = buildSEO(
    editMode ? "Edit Product" : "Add Product",
    "Description"
  );

  return (
    <Layout SEO={pageSEO} page="products">
      {err ? (
        <SomethingWentWrong message={err.message} onRetry={router.reload} />
      ) : uploadRequestLoading ? (
        <Loader message={uploadRequestLoading} />
      ) : (
        <>
          <DetailFormSection
            resetProduct={resetProduct}
            setProduct={setProductData}
            product={product}
            description_richText={description_richText}
            setUploadRequestLoading={setUploadRequestLoading}
            editMode={editMode}
            router={router}
          />
          {editMode && <ReviewsSection product={product} />}
          {editMode && (
            <ImageUploadSection setProduct={setProductData} product={product} />
          )}
        </>
      )}
    </Layout>
  );
};

const DetailFormSection = ({
  product = {},
  description_richText,
  setProduct,
  resetProduct,
  setUploadRequestLoading,
  editMode,
}) => {
  const toast = useToast();

  const handleDiscardAllChanges = () => {
    resetProduct();
    description_richText.handleClear();
  };

  const handleUploadProduct = async () => {
    let mount = true;

    setUploadRequestLoading(
      `${editMode ? "Updat" : "Creat"}ing product, please wait`
    );

    try {
      if (!product.categoryId) {
        throw new Error("Select a category before upload");
      }
      if (!product.tags?.length) {
        throw new Error("Add at least one tag");
      }

      let payload = {
        ...product,
        price: +product.price,
      };

      if (
        product.description &&
        product.description !== description_richText.initialEditorState
      ) {
        payload = {
          ...payload,
          description: getConvertedStringJson(product.description),
        };
      }

      if (editMode) {
        // `editMode` === productId
        await http.patch(`/products/${editMode}`, payload);
      } else {
        await http.post("/products", payload);

        if (mount) {
          handleDiscardAllChanges();
        }
      }

      if (mount) {
        setUploadRequestLoading(false);
      }

      toast.displayToast({
        description: `This product has been successfully ${
          editMode ? "updated" : "created"
        }`,
        duration: 5000,
        status: "success",
      });
    } catch (err) {
      if (mount) {
        setUploadRequestLoading(false);
      }

      toast.displayToast({
        description: err.message,
        duration: 5000,
      });
    }

    return () => {
      mount = false;
    };
  };

  // Categories
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [productClassName, setProductClassName] = useState("");
  const [categories, setCategories] = useState({});
  const [previewMode, setPreviewMode] = useState(product.categoryId);
  const [completeSelection, setCompleteSection] = useState(product.categoryId);

  const categoryState = {
    categoryName,
    setCategoryName,
    subCategoryName,
    setSubCategoryName,
    productClassName,
    setProductClassName,
    previewMode,
    setPreviewMode,
    categories,
    setCategories,
    setCompleteSection,
  };

  const [canUploadProduct, setCanUploadProduct] = useState(false);

  const handleCategory = () => {
    let categoryId, subCategoryId;
    // ,parentCategoryId;

    const category = [...categories.data].find((c) => c.name === categoryName);
    categoryId = category.id;

    if (subCategoryName) {
      const subCategory = category.subCategories.find(
        (c) => c.name === subCategoryName
      );

      subCategoryId = subCategory.id;
      // parentCategoryId = category.id;

      setPreviewMode(subCategoryId);
    } else {
      // parentCategoryId = null;
      setPreviewMode(categoryId);
    }

    setProduct({ categoryId, subCategoryId, productClass: productClassName });
  };
  // End Categories

  // PrimaryDetails
  const handlePrimaryDetails = async (fieldsObj) => {
    // const schema = Yup.object().shape({
    //   name: Yup.string().required("Name cannot be empty"),
    //   price: Yup.string().required("Price cannot be empty"),
    //   description: Yup.string()
    //   .required("Description cannot be empty"),
    // });

    // await schema.validate(fieldsObj);

    setProduct(fieldsObj);
  };
  const initialPrimaryFields = [
    {
      value: `${product.name || ""}`,
      label: "product name",
      id: "name",
    },
    {
      value: `${product.price || ""}`,
      label: "price",
      id: "price",
      type: "number",
    },
  ];

  const doSubmitEntireForm = async (fieldsObj) => {
    await handlePrimaryDetails(fieldsObj);
    handleCategory();

    setCanUploadProduct(true);
  };

  // Handle Actual HTTP upload
  useEffect(() => {
    let mount = true;

    const upload = async () => {
      if (canUploadProduct) {
        setCanUploadProduct(false);

        try {
          await handleUploadProduct();
        } catch (error) {
          if (mount) {
            toast.displayToast({
              description: err.message,
              duration: 5000,
            });
          }
        }
      }
    };

    upload();

    return () => {
      mount = false;
    };
  }, [canUploadProduct]);

  const form = useForm({
    initialFieldsProps: initialPrimaryFields,
    doSubmit: doSubmitEntireForm,
    freezeValues: true,
  });

  const allValues = [
    ...form.fieldsProps,
    { value: completeSelection && categoryName },
  ]
    .reduce((prev, item) => [...prev, item.value], [])
    .filter((value) => value);
  const filledAllValues = allValues.length === 4;
  // End PrimaryDetails {}

  return (
    <Section>
      <Box as="form" {...form.formProps} maxW={breakpoints.md}>
        <PrimaryDetails
          richText={description_richText}
          setProduct={setProduct}
          form={form}
          mb={5}
          pb={5}
          borderBottom="1px"
          borderColor="brand.gray5"
        />

        <Category
          setProduct={setProduct}
          product={product}
          pb={5}
          borderBottom="1px"
          borderColor="brand.gray5"
          {...categoryState}
        />

        <Tags
          // uploadRequestLoading={uploadRequestLoading}
          setProduct={setProduct}
          tags={product.tags || []}
          pb={5}
          borderBottom="1px"
          borderColor="brand.gray5"
        />

        {product && (
          <Box bg="brand.gray6" pt={10} pb={3}>
            {form.renderSubmitBtn({
              leftIcon: editMode ? <MdUpdate /> : <FiUpload />,
              variant: "primary",
              text: editMode ? "Update this product" : "Create this product",
              disabled: !categories.data,
              // disabled: !filledAllValues,
            })}
          </Box>
        )}
      </Box>
    </Section>
  );
};

const PrimaryDetails = ({ form, richText, setProduct, ...rest }) => {
  const handDescriptionChange = (editorState) => {
    setProduct({ description: editorState });
    richText.onEditorChange(editorState);
  };

  return (
    <Box {...rest}>
      <Text type="md-bold" color="brand.secondary">
        Primary details
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={3}>
        {form.fieldsProps.map((field) => (
          <GridItem key={field.id}>
            <TextField {...field} onChange={form.handleType} />
          </GridItem>
        ))}

        <GridItem colStart={1} colEnd={{ base: 1, md: 3 }}>
          <RichText
            editorState={richText.editorState}
            onEditorChange={handDescriptionChange}
            label="description"
            id="description"
            placeholder="description"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

const Tags = ({ tags, setProduct, ...rest }) => {
  const toast = useToast();

  const TagForm = ({
    value: initialTag = "",
    onToggleEditMode: onCloseEditMode,
  }) => {
    const [tag, setTag] = useState(initialTag);

    const handleCancel = () => {
      if (initialTag) {
        onCloseEditMode();
      } else {
        setTag("");
      }
    };

    const handleAdd = () => {
      let newTags = [...tags];

      if (initialTag) {
        const tagIndex = newTags.findIndex((tag) => tag === initialTag);
        newTags.splice(tagIndex, 1, tag);
      } else {
        newTags.push(tag);
      }

      setProduct({ tags: newTags });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!tag) {
        toast.displayToast({
          description: "Cannot add an empty tag!",
        });
      } else {
        handleAdd();
        handleCancel();
      }
    };

    const handleType = ({ target: { value } }) => {
      setTag(value);
    };

    return (
      <Flex my={1} alignItems="center">
        <TextField
          placeholder="Add a new tag"
          value={tag}
          onChange={handleType}
          formGroup={{ m: 0 }}
        />

        <IconButton onClick={handleSubmit} variant="secondary" mx={1}>
          <BiPlus />
        </IconButton>

        <IconButton onClick={handleCancel}>
          <VscClose />
        </IconButton>
      </Flex>
    );
  };

  const Tag = ({ tag }) => {
    const [editMode, setEditMode] = useState();

    const handleToggleEditMode = () => {
      setEditMode((prev) => !prev);
    };

    const handleDelete = (tag) => {
      const newTags = [...tags];
      const tagIndex = newTags.findIndex((t) => t === tag);
      newTags.splice(tagIndex, 1);

      setProduct({ tags: newTags });
    };

    return editMode ? (
      <TagForm value={tag} onToggleEditMode={handleToggleEditMode} />
    ) : (
      <Flex
        m={1}
        bg="brand.gray5"
        rounded="full"
        alignItems="center"
        textTransform="uppercase"
        w="fit-content"
      >
        <Text type="nm-bold" mute px={5}>
          {tag}
        </Text>

        <IconButton
          color="brand.primary"
          bg="brand.primaryLight"
          onClick={handleToggleEditMode}
          mr={2}
        >
          <BiEdit />
        </IconButton>

        <IconButton
          color="brand.error"
          bg="brand.errorLight"
          onClick={handleDelete.bind(null, tag)}
        >
          <IoTrashOutline />
        </IconButton>
      </Flex>
    );
  };

  return (
    <Box pt={5} {...rest}>
      <Text type="md-bold" color="brand.secondary">
        Tags
      </Text>

      <Flex flexWrap="wrap" mb={2}>
        {tags?.map((tag) => (
          <Tag key={Math.random() * 100} tag={tag} />
        ))}
      </Flex>

      <Box>
        <TagForm />
      </Box>
    </Box>
  );
};

const Category = ({
  product,
  setProduct,
  categoryName,
  setCategoryName,
  subCategoryName,
  setSubCategoryName,
  productClassName,
  setProductClassName,
  previewMode,
  setPreviewMode,
  categories,
  setCategories,
  setCompleteSection,
  ...rest
}) => {
  const productClasses = ["food-packs", "electronics"];
  let isMounted = true;

  const handleChooseCategory = ({ target: { value } }, setter) => {
    const getCategory = (name) => categories.data.find((c) => c.name === name);

    const productClassName = (
      getCategory(value) ||
      getCategory(categoryName).subCategories.find((c) => c.name === value)
    ).productClass;

    setter(value);

    setProductClassName(productClassName);
  };

  const fetchCategories = async () => {
    setCategories({ loading: true });

    try {
      const {
        data: { data },
      } = await http.get(`/product-categories`);

      const categories = data.docs.map((category) => ({
        id: category.id,
        name: category.name,
        productClass: category.productClass,
        subCategories: category.subCategories,
      }));

      if (isMounted) {
        setCategories({ data: categories });
      }
    } catch (err) {
      if (isMounted) {
        setCategories({ error: err.message });
      }
    }
  };

  useEffect(() => {
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (product.categoryId && categories.data) {
      const getCategory = (categories, id) =>
        [...categories].find((c) => c.id === id);

      let parentCategoryId;

      let category = getCategory(categories.data, product.categoryId);

      if (!category) {
        for (let i = 0; i < categories.data.length; i++) {
          for (let j = 0; j < categories.data[i].subCategories.length; j++) {
            const subCategory = categories.data[i].subCategories[j];

            if (subCategory.id === product.categoryId) {
              category = categories.data[i];
              parentCategoryId = categories.data[i].id;
            }
          }
        }
      }

      setCategoryName(category.name);
      setProductClassName(category.productClass);

      if (parentCategoryId) {
        const subCategory = getCategory(
          category.subCategories,
          product.categoryId
        );

        setSubCategoryName(subCategory?.name);
      }
    }
  }, [product.categoryId, categories.data]);

  const PickCategory = ({ productClass }) => {
    const filteredCategories = productClass
      ? categories.data.filter(
          (category) => category.productClass === productClass
        )
      : [...categories.data].find((c) => c.name === categoryName).subCategories;

    return !filteredCategories.length ? (
      <Heading color="brand.error">
        No {productClass ? "categories" : "sub-categories"} available
      </Heading>
    ) : (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={productClass ? categoryName : subCategoryName}
          onChange={(e) =>
            handleChooseCategory(
              e,
              productClass ? setCategoryName : setSubCategoryName
            )
          }
        >
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={{ base: 2, md: 5 }}
          >
            {filteredCategories.map((category) => (
              <GridItem key={category.id}>
                <FormControlLabel
                  value={category.name}
                  label={category.name}
                  control={<Radio />}
                />
              </GridItem>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    );
  };

  const DonePicking = () => {
    return (
      <Box mb={6} pt={5}>
        <Box>
          <Chip
            label={productClassName}
            icon={
              productClassName.includes("food") ? (
                <IoFastFoodOutline />
              ) : (
                <FcElectronics />
              )
            }
          />
        </Box>

        <Box my={2}>
          <Chip
            label={categoryName}
            color={subCategoryName ? "secondary" : "primary"}
            icon={subCategoryName ? undefined : <FaCheck />}
          />
        </Box>

        {subCategoryName && (
          <Box>
            <Chip label={subCategoryName} color="primary" icon={<FaCheck />} />
          </Box>
        )}
      </Box>
    );
  };

  const stepperData = (productClass) => [
    {
      heading: "Choose a category",
      content: <PickCategory productClass={productClass} />,
      renderNext: ({ handleNext }) => (
        <Button
          sm
          variant="primary"
          onClick={handleNext}
          rightIcon={<IoIosArrowRoundForward />}
          disabled={!categoryName}
        >
          Next
        </Button>
      ),
    },
    {
      heading: "Choose a sub-category",
      content: <PickCategory />,
      renderNext: ({ handleNext }) => (
        <Button
          sm
          variant="primary"
          onClick={() => {
            handleNext();
            setCompleteSection(true);
          }}
          rightIcon={<IoCheckmarkDone />}
        >
          Finish
        </Button>
      ),
    },
  ];

  const handleCategoryNamesReset = () => {
    setCategoryName("");
    setSubCategoryName("");
    setCompleteSection(false);
  };

  return (
    <Box {...rest}>
      <Text type="md-bold" color="brand.secondary" mb={{ base: 5, md: 0 }}>
        Pick a category
      </Text>

      {categories.loading && (
        <Loader h="auto" message="Getting all categories" />
      )}
      {categories.error && (
        <SomethingWentWrong
          onRetry={fetchCategories}
          h="auto"
          message={categories.error}
        />
      )}

      {categories.data && (
        <Box>
          {previewMode ? (
            <Box>
              <DonePicking />

              <Button
                sm
                onClick={() => {
                  setPreviewMode(false);
                  handleCategoryNamesReset();
                }}
                leftIcon={<HiOutlineSwitchHorizontal />}
                color="brand.secondary"
              >
                Choose a different category
              </Button>
            </Box>
          ) : (
            <Tabs variant="enclosed" mb={5}>
              <TabList>
                {productClasses.map((productClass) => (
                  <Tab key={productClass} textTransform="uppercase">
                    <Icon d={{ base: "none", md: "inline-block" }} mr={2}>
                      {productClass.includes("food") ? (
                        <IoFastFoodOutline />
                      ) : (
                        <FcElectronics />
                      )}
                    </Icon>

                    {productClass}
                  </Tab>
                ))}
              </TabList>
              <TabPanels
                border="1px"
                borderTop={0}
                rounded="md"
                roundedTop="none"
                borderColor="brand.gray5"
              >
                {productClasses.map((productClass) => {
                  return (
                    <TabPanel key={productClass}>
                      <VerticalStepper
                        data={stepperData(productClass)}
                        renderFinishContent={() => <DonePicking />}
                        renderResetButton={({ handleReset }) => (
                          <VerticalStepperResetButton
                            onClick={() => {
                              handleCategoryNamesReset();
                              handleReset();
                            }}
                          />
                        )}
                      />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          )}
        </Box>
      )}
    </Box>
  );
};

const ImageUploadSection = ({ product = {}, setProduct, ...rest }) => {
  return (
    <Section {...rest}>
      <Text type="md-bold" color="brand.secondary">
        Upload images
      </Text>

      <ImageUpload product={product} setProduct={setProduct} />
    </Section>
  );
};

const ReviewsSection = ({ product, ...rest }) => {
  // useFormSubmitFeedback({
  //   formSubmitState: formSubmitState,
  //   successText: "Successfully Updated",
  // });

  const pagination = usePagination();

  const [reviews, setReviews] = useState(null);

  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      if (product.id) {
        try {
          const {
            data: { data },
          } = await http.get(
            `/products/${product.id}/reviews?limit=5&page=${pagination.page}`
          );

          if (isMounted) {
            setReviews({ ...data, docs: [1, 2, 3] });
            // setReviews(data);
          }
        } catch (err) {
          toast.displayToast({
            description: err.message,
            duration: 5000,
          });
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [product.id, pagination.page]);

  return (
    <Section {...rest}>
      <Heading type="h5" color="brand.secondary">
        Reviews
      </Heading>

      <Box>
        {reviews === null ? (
          <Loader h="100px" />
        ) : reviews ? (
          reviews.docs.length ? (
            <Box>
              {reviews.docs.map((review, index) => (
                <Box
                  key={index}
                  borderTop="1px"
                  borderColor="brand.gray4"
                  py={5}
                >
                  <Ratings value={4} mb={5} color="brand.secondary" />

                  <Text>
                    Enjoy healthier fried food with the Air Fry technology. It
                    combines the use of hot air circulation and the heated
                    Crusty Plate to give you healthier crispy bites with only a
                    touch of oil, saving you the hassle of cleaning up any
                    greasy pans or oil splatters!
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
              ))}

              <Pagination
                onPageChange={pagination.handlePageChange}
                page={pagination.page}
                pageTotal={reviews.pages}
                itemTotal={reviews.total}
              />
            </Box>
          ) : (
            <SomethingWentWrong message="No reviews yet" h="100px" />
          )
        ) : (
          <SomethingWentWrong h="100px" />
        )}
      </Box>
    </Section>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const { id } = query;
  const { token } = req.cookies;

  let product = {},
    err = null;

  if (id !== "add") {
    try {
      const {
        data: { data },
      } = await http.get(`/products/${id}/details`, { token });

      product = data;
    } catch (error) {
      err = {
        message: error.message.includes("404")
          ? "Product not found"
          : error.message,
      };
    }
  }

  return {
    props: {
      productData: product,
      err,
    },
  };
};

export default ProductsPage;
