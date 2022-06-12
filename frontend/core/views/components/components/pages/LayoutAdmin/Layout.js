import Head from "next/head";
import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import Header from "./Header/Header";
import MainArea from "./MainArea/MainArea";
import useAuth from "hooks/useAuth";
import useNetwork from "hooks/useNetwork";
import usePageReady from "hooks/usePageReady";
import Aside from "./Aside/Aside";
import breakpoints from "theme/breakpoints";
import { useRouter } from "next/router";

/**
 * This component should be used as a Wrapper component for every page
 * page Wrapper
 */

const NotAuthenticated = ({ router }) => {
  useEffect(() => {
    console.log("redirecting");
    router.replace("/signin");
  }, []);

  return null;
};

export const LayoutAdmin = ({
  children,
  headerBg,
  bg,
  SEO,
  page = "dashboard",
  pageHeader,
  pageDisplayText,
  ...rest
}) => {
  const auth = useAuth();
  const network = useNetwork();
  const ready = usePageReady();
  const router = useRouter();
  auth.isAuthenticated =true

  // Display the online-status in a Toast, every time the `network.isOnline`(online-status) changes
  useEffect(() => {
    network.displayToast();
  }, [network.isOnline]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="main" flexDir="column" minH="100vh" {...rest}>
        {/* This component is for SEO reasons. if `SEO` is passed, it'll override the default SEO config */}
        {SEO && <NextSeo {...SEO} />}

        {/* When the page full control has been handed over to the Client? that when the Content should be loaded */}
        {ready &&
          (auth.isAuthenticated ? (
            <Flex
              w="100vw"
              h="100vh"
              maxW={breakpoints.xl}
              boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
              mx="auto"
              overflowX="hidden"
            >
              <Aside
                flexShrink={0}
                h="100%"
                activePage={page}
                activePageHeader={pageHeader}
              />

              <Flex flexDir="column" flex={1} h="100%">
                <Header bg={headerBg} activePage={pageDisplayText || page} />

              <MainArea bg={bg} flex={1} bg="brand.gray6" overflow="auto">
                  {children}
                </MainArea>  
              </Flex>
            </Flex>
          ) : (
            <NotAuthenticated router={router} auth={auth} />
          ))}
      </Flex>
    </>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.any.isRequired,
  headerBg: PropTypes.string,
  SEO: PropTypes.object,
  page: PropTypes.string,
  pageHeader: PropTypes.string,
  pageDisplayText: PropTypes.string,
};
