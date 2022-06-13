import React , { useState} from "react"

import { Layout } from "components/components/pages";
import { Box, Flex } from "@chakra-ui/layout";
import { Heading, Button, Link, Text, Tab, Image } from "components/shared/lib";
import { Section, CartIcon } from "components/components/pages";
import { AiOutlineRight } from "react-icons/ai";
import breakpoints from "theme/breakpoints";
import formatPrice from "utils/formatPrice";

import buildSEO from "utils/buildSEO";
const pageSEO = buildSEO("Landing","Description")

const LandingPage = () => {
  

  return (
    <Layout
      SEO={pageSEO}
      withFooterEmailSection
    >
      <div>we are the children</div>
    </Layout>
  );
};

export default LandingPage;

