import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/layout";
import slugify from "slugify";
import { useState } from "react";
import { headerHeight } from "components/components/pages";
import { Accordion } from "../Accordion/Accordion";

export const Tab = ({
  data,
  bg,
  secondaryActiveBg,
  activeHeader,
  responsive,
}) => {
  const tabs = data.map((tab) => ({ ...tab, slug: slugify(tab.header) }));

  const initialActiveTab = activeHeader
    ? tabs.find((tab) => tab.header === activeHeader)
    : tabs[0];

  const [active, setActive] = useState(initialActiveTab.slug);

  // console.log(router);

  const handleTabClick = (slug) => {
    setActive(slug);
  };

  const renderContent = () => {
    const content = tabs.find((tab) => tab.slug === active)?.content;

    return (
      content && (
        <Box as="main" py={4} testid="tab-content">
          {content}
        </Box>
      )
    );
  };

  return (
    <>
      {/* Visible form Large Screen Users only if responsive is `truthy` */}
      <Box
        as="section"
        testid="tab"
        d={{ base: responsive ? "none" : "block", md: "block" }}
      >
        <Flex
          as="header"
          justifyContent="center"
          alignItems="center"
          borderBottom="2px"
          borderColor={{ base: "transparent", md: "rgba(0,0,0,.2)" }}
          testid="tab-header"
          flexWrap="wrap"
          className={secondaryActiveBg ? "secondaryActiveBg" : ""}
          pos="sticky"
          // Have to consider the `height` of the `Header` in Layout
          top={{ base: headerHeight.base + "px", lg: headerHeight.lg + "px" }}
          zIndex={10}
          bg={bg}
        >
          {tabs.map((tab, index) => (
            <Box
              as="button"
              key={index}
              onClick={handleTabClick.bind(null, tab.slug)}
              className={active === tab.slug ? "active" : ""}
              w={{ base: active === tab.slug ? "100%" : "auto", md: "auto" }}
              mb={{ base: active === tab.slug ? 3 : 0, md: 0 }}
              mx={{ base: active === tab.slug ? 0 : 3, md: 3 }}
              py={{ base: active !== tab.slug ? 0 : 2, md: 5 }}
              {...(active !== tab.slug
                ? {
                    borderBottom: { base: "1px", md: "none" },
                    borderColor: { base: "rgba(0,0,0,.05)", md: "transparent" },
                  }
                : {})}
              px={8}
            >
              {tab.header}
            </Box>
          ))}
        </Flex>

        {renderContent()}
      </Box>

      {/* Visible for Mobiles Users only if responsive is `truthy` */}
      <Box d={{ base: responsive ? "block" : "none", md: "none" }}>
        <Accordion data={data} contentProps={{ pb: 4 }} {...responsive} />
      </Box>
    </>
  );
};

Tab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondaryActiveBg: PropTypes.bool,
  responsive: PropTypes.object,
};
