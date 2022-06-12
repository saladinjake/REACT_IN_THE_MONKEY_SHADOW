import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";


import { Button, Heading, Icon, Link, Text }  from "components/shared/lib";
import { Loader, SomethingWentWrong } from "components/components/pages/Feedback/Feedback";
import { Section } from "components/components/pages/Section/Section";
import useCategories from "hooks/useCategories";
import useHeaderModal from "hooks/useHeaderModal";
import { BiCaretDown, BiChevronRight } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { HeaderModal } from "./Header";

const CategoriesButton = ({ ...rest }) => {
  const headerModal = useHeaderModal();
  const categories = useCategories();

  const handleClose = () => {
    headerModal.setShow(false);
  };

  return (
    <>
      <Button
        sm
        bg="transparent"
        responsive={<CgMenuGridR />}
        leftIcon={<CgMenuGridR />}
        rightIcon={<BiCaretDown />}
        ml={{ base: 6, lg: 10 }}
        onClick={headerModal.handleToggle}
        {...rest}
      >
        Categories
      </Button>

      <HeaderModal setShow={headerModal.setShow} show={headerModal.show}>
        <Section px={0} pt={{ base: 0, md: 5 }}>
          <Flex
            justifyContent="center"
            py={2}
            px={{ base: 0, md: 4 }}
            overflowX="hidden"
          >
            {categories.loading ? (
              <Loader h="45vh" />
            ) : categories.error ? (
              <SomethingWentWrong h="45vh" />
            ) : (
              <Flex
                w={{
                  base: "fit-content",
                  md: "700px",
                  lg: "900px",
                  lg2: "1100px",
                  xl: "1300px",
                }}
                flexWrap="wrap"
                justifyContent={{
                  base: "center",
                  md: !categories.data ? "center" : "flex-start",
                }}
                transform={{ lg: "translateX(5%)" }}
              >
                {
                  // TODO: Filter out the category? when we're in `.../<category>`. by the category.d
                  categories?.data?.map((category) => (
                    <Box
                      flex={{
                        base: "0 0 300px",
                        md: "0 0 210px",
                        lg: "0 0 180px",
                      }}
                      key={category.id}
                      mx={2}
                      mb={5}
                    >
                      <Box mb={2} borderBottom="1px" borderColor="brand.gray5">
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Link
                            href={`category?${category.queryString}`}
                            onClick={handleClose}
                          >
                            <Text type="sm-bold" mute textTransform="uppercase">
                              {category.name}
                            </Text>
                          </Link>

                          <Icon>
                            <BiChevronRight />
                          </Icon>
                        </Flex>
                      </Box>

                      <Box as="main">
                        {category.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.id}
                            // href={
                            //   `/categories/category?sub=${subCategory.id}`
                            // }
                            href={`category?${subCategory.queryString}`}
                            onClick={handleClose}
                          >
                            <Text
                              type="sm-regular"
                              mute
                              textTransform="capitalize"
                            >
                              {subCategory.name}
                            </Text>
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  ))
                }{" "}
              </Flex>
            )}
          </Flex>
        </Section>
      </HeaderModal>
    </>
  );
};

export default CategoriesButton;
