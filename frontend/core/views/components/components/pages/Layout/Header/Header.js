import PropTypes from "prop-types";
import { Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import { MdStore } from "react-icons/md";
import breakpoints from "theme/breakpoints";
import Brand from "./Brand";
import NavBar from "./NavBar";
import { SearchBar } from "components/components/pages";
import { Button, IconButton, Link, Text } from "components/shared/lib";
import useAuth from "hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import CategoriesButton from "./CategoriesButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

export const headerHeight = { base: 70, lg: 70 };

const StoreControl = ({ icon, auth }) =>
  !auth.isAuthenticated && (
    <Link mx={4} mute href="/store">
      {icon ? (
        <IconButton bg="brand.secondary" color="brand.white">
          <MdStore />
        </IconButton>
      ) : (
        <Button variant="secondary" sm>
          Wepons
        </Button>
      )}
    </Link>
  );

const BackButton = ({ onNavigateBack }) => (
  <IconButton
    onClick={onNavigateBack}
    opacity={0.7}
    _hover={{ opacity: 1 }}
    pos="absolute"
    bottom={-10}
    left={0}
    shadow="lg"
  >
    <IoIosArrowRoundBack />
  </IconButton>
);

const Header = ({ bottomBg, bg = "brand.white", ...rest }) => {
  const router = useRouter();
  const auth = useAuth();

  const handleSearch = (query) => {
    console.log(query);
  };

  return (
    <Box  pos="sticky" top={0} zIndex={50}>
      <Flex
        alignItems="center"
        as="header"
        w="100%"
        h={headerHeight}
        maxW={breakpoints.xxl}
        mx="auto"
        bg={bg}
        color="brand.secondary"
        boxShadow="0 2px 15px rgba(0, 0, 0, .03), 0 5px 15px rgba(0, 0, 0, .053)"
        testid="app-header"
        {...rest}
      >
        <Box flex={1} maxW={breakpoints.xl} mx="auto" px={{ base: 2, sm2: 6 }}>
          {/* For Mobile and Tab screens */}
          <Box flex="1" d={{ base: "block", lg: "none" }}>
            <Flex alignItems="center">
              <Flex alignItems="center" flex={1}>
                <BackButton onNavigateBack={router.back} />

                <CategoriesButton m={0} />

                <Brand ml={2} />
              </Flex>

              <StoreControl auth={auth} icon />

              <SearchBar responsive mx={3} onSearch={handleSearch} />

              <NavBar />
            </Flex>
          </Box>

          {/* For PC and Desktops screens */}
          <Flex justifyContent="space-between" d={{ base: "none", lg: "flex" }}>
            <Flex flex={0.75} alignItems="center">
              <Brand />

              <CategoriesButton />
            </Flex>

            <Flex
              flex={1.25}
              justifyContent={{ base: "flex-end", md: "space-between" }}
              alignItems="center"
              // maxW="550px"
            >
              <StoreControl auth={auth} />

              <SearchBar
                responsive
                mr={4}
                flex={{ base: 0, md: 1 }}
                w={{ md: "75%", lg: "70%" }}
                onSearch={handleSearch}
              />
              <NavBar />
            </Flex>
          </Flex>
        </Box>
      </Flex>

      {auth.currentUser?.isActivated === false && (
        <Alert status="info" py={1}>
          <Flex alignItems="center" justifyContent="center" w="100%">
            <AlertIcon fontSize="14px" />
            <Text mute type="sm-bold" d={{ base: "block", md: "none" }}>
              You have not verified your account!
            </Text>
            <Text mute d={{ base: "none", md: "block" }}>
              You have not verified your account!
            </Text>

            <Link mute href="/verify-account">
              <Button sm ml={5}>
                Verify now
              </Button>
            </Link>
          </Flex>
        </Alert>
      )}
    </Box>
  );
};

export const HeaderModal = ({ children, show, setShow }) => {
  const [hide, setHide] = useState(false);
  const modalRef = useRef();

  const handleClose = () => {
    setShow(false);
  };

  // Handle hide content
  useEffect(() => {
    if (!show) {
      const timeoutId = setTimeout(() => setHide(true), 300);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setHide(false);
    }
  }, [show]);

  return (
    !hide && (
      <Box
        ref={modalRef}
        pos="fixed"
        zIndex={55}
        top={headerHeight}
        left={0}
        w="100%"
        h={{
          base: `calc(100vh - ${headerHeight.base}px)`,
          lg: `calc(100vh - ${headerHeight.lg}px)`,
        }}
        translate=".25s"
        opacity={show ? 1 : 0}
      >
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, .2)"
          onClick={handleClose}
          cursor="pointer"
        ></Box>

        <Flex
          bg="brand.white"
          maxH="100%"
          overflowY="auto"
          pos="relative"
          zIndex={1}
          boxShadow="0 10px 15px rgba(0, 0, 0, .03), 0 5px 15px rgba(0, 0, 0, .053)"
        >
          <Box flex={1}>{children}</Box>
        </Flex>
      </Box>
    )
  );
};

Header.propTypes = {
  bg: PropTypes.string,
  bottomBg: PropTypes.string,
};

export default Header;
