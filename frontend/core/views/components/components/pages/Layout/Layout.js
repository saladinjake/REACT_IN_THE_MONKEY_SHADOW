import Head from "next/head";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MainArea from "./MainArea/MainArea";
import useAuth from "hooks/useAuth";
import useNetwork from "hooks/useNetwork";
import usePageReady from "hooks/usePageReady";
import useCart from "hooks/useCart";
import useCategories from "hooks/useCategories";

/**
 * This component should be used as a Wrapper component for every page
 * page Wrapper
 */
export const Layout = ({
  breadcrumb,
  children,
  headerBg,
  bg,
  SEO,
  withFooterEmailSection,
  footerProps,
  ...rest
}) => {
  const auth = useAuth();
  const cart = useCart();
  const categories = useCategories();
  const network = useNetwork();
  const ready = usePageReady();

  // Fetch categories once
  useEffect(() => {
    categories.handleFetch();
  }, []);

  // Persist the user on fresh signin
  // useEffect(() => {
  //   auth.persistUserToClient();
  // }, []);

  // Display the online-status in a Toast, every time the `network.isOnline`(online-status) changes
  useEffect(() => {
    network.displayToast();
  }, [network?.isOnline]);

 
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Flex as="main" flexDir="column" minH="100vh" {...rest}>
        {/* This component is for SEO reasons */}
        {SEO && <NextSeo {...SEO} />}

        {/* When the page full control has been handed over to the Client? that when the Content should be loaded */}
        {ready && (
          <>
            <Header bg={headerBg} />

            <MainArea breadcrumb={breadcrumb} bg={bg}>
              {children}
            </MainArea>

            <Footer emailSection={withFooterEmailSection} {...footerProps} />
          </>
        )}
      </Flex>
    </>
  );
};

Layout.propTypes = {
  // If the `array of object is passed`? a Breadcrumb will be displayed from the `MainArea`
  breadcrumb: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  children: PropTypes.any.isRequired,
  headerBg: PropTypes.string,
  SEO: PropTypes.object,
  // If `true` an Email section will be displayed from the `Footer`
  withFooterEmailSection: PropTypes.bool,
};
