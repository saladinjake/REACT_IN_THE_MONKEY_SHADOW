import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";

import {
  Button,
  Checkbox,
  ConfirmBox,
  Heading,
  Icon,
  IconButton,
  TextField,
  Text,
} from "components/lib";
import { Layout, Section, SomethingWentWrong } from "components/pages";
import useFormSubmitFeedback from "hooks/useFormSubmitFeedback";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import excludeObjectKeys from "utils/excludeObjectKeys";
import { Spinner } from "@chakra-ui/spinner";
import { BiEdit, BiPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { GoLock } from "react-icons/go";

const pageSEO = buildSEO("Upload Product", "Description");

// TODO: disable Submit? nothing has been typed? add an extra type handler.

const CategoryFormPage = ({ categoryData, err }) => {
  const router = useRouter();

  const [editMode, setEditMode] = useState();
  const [category, setCategory] = useState(categoryData);

  const setCategoryData = (newData) => {
    setCategory((prev) => ({ data: { ...prev.data, ...newData } }));
  };

  useEffect(() => {
    if (router.query.id) {
      setEditMode(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <Layout SEO={pageSEO} page="categories">
      {err ? (
        <SomethingWentWrong message={err.message} onRetry={router.reload} />
      ) : (
        <Form setCategory={setCategoryData} category={category} />
      )}
    </Layout>
  );
};

const Form = ({ category: existingTopCategory = {} }) => {
  const toast = useToast();

  const [topCategory, setTopCategory] = useState({
    name: "",
    productClass: "",
    active: false,
  });

  const [requestFeedback, setRequestFeedback] = useState({});

  useFormSubmitFeedback({
    formSubmitState: {
      hasSubmitError: requestFeedback.error,
      hasSubmitted: requestFeedback.success,
    },
  });

  const fetchCategories = async (id) => {
    const {
      data: { data },
    } = await http.get(`/product-categories/${id}`);

    setTopCategory({
      id,
      name: data.name,
      productClass: data.productClass,
      subCategories: data.subCategories,
      active: data.active,
    });
  };

  // (EditMode): set `category.id` from `existingCategory.id`
  useEffect(() => {
    if (existingTopCategory.id) {
      fetchCategories(existingTopCategory.id);
    }
  }, [existingTopCategory.id]);

  const topCategoryEditMode = topCategory.id ? true : false;

  const handleType = ({ target: { value, id } }) => {
    setTopCategory((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = async ({ category, editMode }) => {
    setRequestFeedback({ loading: true });

    // console.log(category);

    try {
      let id;

      if (editMode) {
        // Update
        const {
          data: { data },
        } = await http.patch(
          `/product-categories/${category.id}`,
          // IDs should not be updated
          excludeObjectKeys(category, ["id"])
        );

        id = data.parentCategoryId || data.id;
      } else {
        // Create
        const {
          data: { data },
        } = await http.post("/product-categories", category);

        id = data.parentCategoryId || data.id;
      }

      await fetchCategories(id);

      setRequestFeedback({
        success: `${
          category.parentCategoryId ? "Sub-category" : "Category"
        } successfully ${editMode ? "updated" : "created"}`,
      });
    } catch (err) {
      setRequestFeedback({ error: err.message });
    }
  };

  const handleDelete = async (id) => {
    setRequestFeedback({ loading: true });

    try {
      await http.delete(`/product-categories/${id}`);

      await fetchCategories(topCategory.id);

      setRequestFeedback({
        success: "Sub-category successfully deleted",
      });
    } catch (err) {
      setRequestFeedback({ error: err.message });
    }
  };

  const handleTopCategoryUpload = (e) => {
    e.preventDefault();

    if (!topCategory.name || !topCategory.productClass) {
      toast.displayToast({
        description: "There's an empty field! Please fill all fields",
      });
    } else {
      handleUpload({
        // if `editMode` ? `subCategories` cannot be updated this way (instructed from the Backend API)
        category: excludeObjectKeys(topCategory, ["subCategories"]),
        editMode: topCategoryEditMode,
      });
    }
  };

  const SubCategoryForm = ({
    id,
    value: initialValue = "",
    onToggleEditMode: onCloseEditMode,
  }) => {
    const [value, setValue] = useState(initialValue);

    const handleCancel = () => {
      if (initialValue) {
        onCloseEditMode();
      } else {
        setValue("");
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!value) {
        toast.displayToast({
          description: "There's an empty field!",
        });
      } else {
        handleUpload({
          category: {
            parentCategoryId: topCategory.id,
            productClass: topCategory.productClass,
            name: value,
            id,
          },
          editMode: initialValue,
        });

        handleCancel();
      }
    };

    const handleType = ({ target: { value } }) => {
      setValue(value);
    };

    return (
      <Flex my={1} alignItems="center" as="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Add a new sub-category"
          value={value}
          onChange={handleType}
          formGroup={{ m: 0 }}
        />

        <IconButton type="submit" variant="secondary" mx={1}>
          <BiPlus />
        </IconButton>

        <IconButton onClick={handleCancel}>
          <VscClose />
        </IconButton>
      </Flex>
    );
  };

  const SubCategoryTag = ({ data }) => {
    const [editMode, setEditMode] = useState();

    const handleToggleEditMode = () => {
      setEditMode((prev) => !prev);
    };

    return editMode ? (
      <SubCategoryForm
        value={data.name}
        id={data.id}
        onToggleEditMode={handleToggleEditMode}
      />
    ) : (
      <Flex
        m={1}
        key={data.id}
        bg="brand.gray5"
        rounded="full"
        alignItems="center"
        textTransform="uppercase"
        w="fit-content"
      >
        <Text type="nm-bold" mute px={5}>
          {data.name}
        </Text>

        <IconButton
          color="brand.primary"
          bg="brand.primaryLight"
          onClick={handleToggleEditMode}
          disabled={requestFeedback.loading}
          mr={2}
        >
          <BiEdit />
        </IconButton>

        <ConfirmBox
          renderTrigger={({ handleOpen }) => (
            <IconButton
              color="brand.error"
              bg="brand.errorLight"
              onClick={handleOpen}
              disabled={requestFeedback.loading}
            >
              <IoTrashOutline />
            </IconButton>
          )}
          renderConfirm={({ props }) => (
            <Button
              onClick={handleDelete.bind(null, data.id)}
              leftIcon={<IoTrashOutline />}
              {...props}
            >
              Yes delete this sub-category
            </Button>
          )}
        >
          This action cannot be reversed. Are you sure you want to delete{" "}
          <Text type="nm-bold" as="span">
            {data.name}
          </Text>
          ?
        </ConfirmBox>
      </Flex>
    );
  };

  return (
    <>
      <Section>
        <Heading type="h5" color="brand.secondary">
          Top category
        </Heading>

        <Box as="form" onSubmit={handleTopCategoryUpload}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={3}>
            <GridItem>
              <TextField
                label="name"
                id="name"
                value={topCategory.name}
                onChange={handleType}
                disabled={requestFeedback.loading}
              />
            </GridItem>

            <GridItem>
              <TextField
                label="category class"
                id="productClass"
                value={topCategory.productClass}
                onChange={handleType}
                select={[
                  {
                    label: "Electronics",
                    value: "electronics",
                  },
                  {
                    label: "Food packs",
                    value: "food-packs",
                  },
                ]}
              />
            </GridItem>
          </Grid>

          <Checkbox
            isChecked={topCategory.active}
            onChange={() =>
              setTopCategory((prev) => ({ ...prev, active: !prev.active }))
            }
            label="Activate this category"
          />

          <Flex justifyContent="flex-end" alignItems="center">
            {requestFeedback.loading && <Spinner />}
            <Button
              type="submit"
              variant="primary"
              leftIcon={topCategoryEditMode ? <MdUpdate /> : <FiUpload />}
              disabled={requestFeedback.loading}
              sm
            >
              {topCategoryEditMode ? "Update" : "Create"}
            </Button>
          </Flex>
        </Box>
      </Section>

      <Section pos="relative">
        {!topCategory.id && (
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            pos="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={1}
            bg="rgba(255, 255, 255, .8)"
            color="brand.secondary"
          >
            <Icon fontSize="200%">
              <GoLock />
            </Icon>

            <Heading mute>Create a Top-Category to unlock this section</Heading>
          </Flex>
        )}

        <Heading type="h5" color="brand.secondary">
          Sub categories
        </Heading>

        <Flex flexWrap="wrap" mb={2}>
          {topCategory.subCategories?.map((subCategory) => (
            <SubCategoryTag key={subCategory.id} data={subCategory} />
          ))}
        </Flex>

        <Box pt={5}>
          <SubCategoryForm />
        </Box>
      </Section>
    </>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const { id } = query;
  const { token } = req.cookies;

  let category = {},
    err = null;

  if (id !== "add") {
    try {
      const {
        data: { data },
      } = await http.get(`/product-categories/${id}`, { token });

      category = data;
    } catch (error) {
      err = {
        message: error.message.includes("404")
          ? "Category not found"
          : error.message,
      };
    }
  }

  return {
    props: {
      categoryData: category,
      err,
    },
  };
};

export default CategoryFormPage;
