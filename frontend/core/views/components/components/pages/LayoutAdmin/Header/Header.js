import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import { IconButton } from "components/shared/lib";
import useAside from "hooks/useAdminAside";
import { BrandText, BrandLogo } from "./Brand";
import { useRouter } from "next/router";
import { BsListUl, BsList } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";

export const headerHeight = { base: 50, lg: 50 };

export const IconButtonWithTooltip = ({ tip, onClick, icon, ...rest }) => {
  return (
    <IconButton
      toolTip={tip}
      fontSize="1.5rem"
      ml={2}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </IconButton>
  );
};

const Header = ({ bottomBg, activePage, bg = "brand.white", ...rest }) => {
  const aside = useAside();
  const router = useRouter();

  const handleBarsClick = () => {
    // aside.handleOpen();
    aside.handleToggle();
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderBackButton = (props) => (
    <IconButtonWithTooltip
      tip="Go back"
      onClick={handleGoBack}
      icon={<IoIosArrowRoundBack />}
      shadow="md"
      {...props}
    />
  );

  return (
    <Flex
      alignItems="center"
      as="header"
      w="100%"
      h={headerHeight}
      mx="auto"
      bg={bg}
      color="brand.secondary"
      testid="app-header"
      px={2}
      pos="relative"
      {...rest}
    >
      <Flex alignItems="center" flex={1}>
        {/* for Mobiles */}
        <Box d={{ base: "none", md: "block" }}>{renderBackButton()}</Box>
        {/* from Tabs */}
        <Box d={{ base: "block", md: "none" }}>
          <BrandLogo />
          {renderBackButton({
            pos: "absolute",
            top: "110%",
            left: 0,
            zIndex: 10,
          })}
        </Box>

        {aside.isOpen ? (
          <IconButtonWithTooltip
            tip="Close menu"
            onClick={handleBarsClick}
            icon={<BsList />}
          />
        ) : (
          <IconButtonWithTooltip
            tip="Open menu"
            onClick={handleBarsClick}
            icon={<BsListUl />}
          />
        )}

        {!aside.isOpen && <BrandText text={activePage} ml={5} />}
      </Flex>

      <NavBar />
    </Flex>
  );
};

Header.propTypes = {
  bg: PropTypes.string,
  bottomBg: PropTypes.string,
};

export default Header;
