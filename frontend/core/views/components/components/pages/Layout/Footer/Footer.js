import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillYoutube,
  AiFillTwitterSquare,
  AiFillCaretDown,
  AiOutlineCopyrightCircle,
  AiFillMail,
} from "react-icons/ai";
import { SiAmericanexpress, SiMastercard, SiVisa } from "react-icons/si";
import { ImPaypal } from "react-icons/im";
import { FaAngleDoubleUp } from "react-icons/fa";
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  TextField,
} from "components/shared/lib";
import { Section } from "components/components/pages";
import breakpoints from "theme/breakpoints";
import { useRouter } from "next/router";
import { useState } from "react";

const Footer = ({ emailSection, ...rest }) => {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");
  const handleEmailChange = ({ target: { value } }) => setEmailValue(value);

  return (
    <Box
      as="footer"
      minH="466px"
      w="100%"
      maxW={breakpoints.xxl}
      mx="auto"
      pos="relative"
      bg="brand.black"
      {...rest}
      color="brand.white"
    >
      {emailSection && (
        <Section
          maxW={breakpoints.xxl}
          bg="gray.700"
          color="white"
          py={20}
        >
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-end" }}
            justifyContent={{ base: "flex-start", md: "space-between" }}
            maxW={breakpoints.lg}
            mx="auto"
          >
            <Box
              as="header"
              textAlign={{ base: "center", md: "left" }}
              w={{ md: "400px", lg: "500px" }}
            >
              <Heading type="h3" maxW={{ md: "350px", lg: "450px" }}>
                Subscribe to our discounts and Recommendations
              </Heading>

              <Text
                type="lg-regular"
                mt={{ base: 7, md: 0 }}
                mb={{ base: 10, md: 0 }}
              >
                Don’t Worry we won’t spam.
              </Text>
            </Box>

            <Box as="main">
              <Flex
                as="form"
                borderColor="brand.white"
                bg="brand.white"
                color="black"
                rounded="md"
                alignItems="center"
                p={1}
              >
                <TextField
                  variant="ghost"
                  formGroup={{ m: 0, flex: 1 }}
                  border="none"
                  m={0}
                  px={2}
                  placeholder="E-mail"
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  id="newsletter-email"
                />

                <Button variant="secondary" rightIcon={<AiFillMail />}>
                  Send
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Section>
      ) }

      <Link
        href={{
          pathname: router.pathname,
          query: { ...router.query, top: true },
        }}
        pos="absolute"
        top={0}
        right={0}
        transform="translate(-10%, -37%)"
      >
        <IconButton
          shadow="md"
          bg="brand.gray5"
          opacity={0.85}
          _hover={{ opacity: 1 }}
          alwaysLg
        >
          <FaAngleDoubleUp />
        </IconButton>
      </Link>

      <Box
        as="section"
        pt={10}
        px={4}
        mb={8}
        maxW={breakpoints.xl}
        mx="auto"
        // border="2px"
        bg="brand.black"
      >
        <Grid
          templateColumns={{
            base: "1fr 1fr",
            md: "1fr 1fr auto",
            lg: "1fr 1fr 1.2fr 1fr",
          }}
          rowGap={6}
          mb={2}
        >
          <GridItem>
            <Heading type="h6" mb={4}>
              Brands
            </Heading>

            <UnorderedList spacing={3} listStyleType="none" m={0}>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Bombs</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Tankers</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Helicopters</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Riffles</Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </GridItem>

          <GridItem>
            <Heading type="h6" mb={4}>
              Company
            </Heading>

            <UnorderedList spacing={3} listStyleType="none" m={0}>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="/about">
                  <Text type="sm-regular">About us</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Vacancies</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Rules & Terms</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Corporate Clients</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Contacts</Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </GridItem>

          <GridItem>
            <Heading type="h6" mb={4}>
              Help
            </Heading>

            <UnorderedList spacing={3} listStyleType="none" m={0}>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Questions & Answers</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Money Refund</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Delivery & Payment</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">Payment in Installments</Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </GridItem>

          {/* <GridItem>
            <Heading type="h6" mb={4}>
              Useful Information
            </Heading>

            <UnorderedList spacing={3} listStyleType="none" m={0}>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="/signin">
                  <Text type="sm-regular">Sign in</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="/signup">
                  <Text type="sm-regular">Sign up</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="/account">
                  <Text type="sm-regular">My Account</Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text type="sm-regular">My Orders</Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </GridItem> */}

          <GridItem>
            <Heading type="h6" mb={4}>
              Social
            </Heading>

            <UnorderedList
              spacing={3}
              listStyleType="none"
              m={0}
              color="brand.gray3"
            >
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text
                    type="sm-bold"
                    d="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                  >
                    <Icon mr={3}>
                      <AiFillFacebook />
                    </Icon>
                    Facebook
                  </Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text
                    type="sm-bold"
                    d="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                  >
                    <Icon mr={3}>
                      <AiFillTwitterSquare />
                    </Icon>
                    Twitter
                  </Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text
                    type="sm-bold"
                    d="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                  >
                    <Icon mr={3}>
                      <AiFillInstagram />
                    </Icon>
                    Instagram
                  </Text>
                </Link>
              </ListItem>
              <ListItem w={{ base: "auto", md: "fit-content" }}>
                <Link href="#">
                  <Text
                    type="sm-bold"
                    d="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                  >
                    <Icon mr={3}>
                      <AiFillYoutube />
                    </Icon>
                    Youtube
                  </Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </GridItem>
        </Grid>

        <Flex
          justifyContent={{ base: "center", md: "flex-end" }}
          my={{ base: 5, md: 0 }}
          transform={{ md: "translateY(-110%)", lg: "translateY(0%)" }}
        >
          <Button sm variant="primary" rightIcon={<AiFillCaretDown />}>
            Help & Advice
          </Button>
        </Flex>
      </Box>

      <Flex
        as="section"
        borderTop="1px"
        color="brand.gray3"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        minH="60px"
        w={{ base: "100%", md: "90%" }}
        mx="auto"
        px={4}
        pt={{ base: 10, md: 7 }}
        pb={7}
      >
        <Text
          my={{ base: 1, md: 0 }}
          type="sm-regular"
          d="flex"
          alignItems="center"
          mr={5}
        >
          <Icon>
            <AiOutlineCopyrightCircle />
          </Icon>
          2021 Pacemaker. All rights reserved.
        </Text>

        <Text my={{ base: 1, md: 0 }} type="sm-regular" mr={{ base: 7, md: 5 }}>
          <Link href="#">info@pacemaker.com</Link>
        </Text>

        <Text my={{ base: 1, md: 0 }} type="sm-regular" mr={{ base: 7, md: 5 }}>
          <Link href="#">+234-80-123-456-78</Link>
        </Text>

        <Text my={{ base: 1, md: 0 }} type="sm-regular" mr={{ base: 7, md: 5 }}>
          456 Silicon Valley
        </Text>

        <Flex
          my={{ base: 5, md: 0 }}
          color="brand.black1"
          w={{ base: "100%", md: "auto" }}
          justifyContent="center"
        >
          <Icon border="1px" shadow="md" mr={2}>
            <SiAmericanexpress />
          </Icon>
          <Icon border="1px" shadow="md" mr={2}>
            <SiMastercard />
          </Icon>
          <Icon border="1px" shadow="md" mr={2}>
            <ImPaypal />
          </Icon>
          <Icon border="1px" shadow="md">
            <SiVisa />
          </Icon>
        </Flex>
      </Flex>
    </Box>
  );
};

Footer.propTypes = {
  emailSection: PropTypes.bool,
};

Footer.defaultProps = {
  emailSection: false,
};

export default Footer;
