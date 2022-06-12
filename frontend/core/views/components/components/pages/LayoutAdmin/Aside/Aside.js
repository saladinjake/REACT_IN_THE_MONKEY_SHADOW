import { Box, Flex } from "@chakra-ui/layout";
import { MdDashboard } from "react-icons/md";
import { Accordion, Icon, IconButton, Link, Text } from "components/shared/lib";
import { headerHeight } from "../Header/Header";
import useAside from "hooks/useAside";
import Brand, { BrandLogo } from "../Header/Brand";
import { Fragment, useEffect, useState } from "react";
import { BiTable } from "react-icons/bi";
import useAuth from "hooks/useAuth";
import useDimensions from "hooks/useDimensions";
import { useRouter } from "next/router";
import colors from "theme/colors";
import { Tooltip } from "@material-ui/core";
import { FiBox } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { AiOutlineClose, AiOutlinePoweroff } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";

const MobileAside = ({ renderItems, handleCloseClick }) => {
  useEffect(() => {
    handleCloseClick();
  }, []);

  return <Box>{renderItems()}</Box>;
};

const Aside = ({ activePage = "dashboard", activePageHeader, ...rest }) => {
  const aside = useAside();
  const auth = useAuth();
  const dimensions = useDimensions();
  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState(innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(innerWidth);
    };

    handleResize();

    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    { text: "dashboard", icon: <DashboardRoundedIcon />, href: "/admin/" },
    { text: "products", icon: <TvRoundedIcon />, href: "/admin/products" },
    { text: "categories", icon: <CategoryRoundedIcon />, href: "/admin/categories" },
    { text: "orders", icon: <CardGiftcardRoundedIcon />, href: "/admin/orders" },
    { text: "users", icon: <PeopleRoundedIcon />, href: "/admin/users" },
    // {
    //   text: "comments",
    //   icon: <QuestionAnswerRoundedIcon />,
    //   href: "/comments",
    // },
    {
      text: "sign out",
      icon: <PowerSettingsNewRoundedIcon color="secondary" />,
      onClick: () => {
        auth.signout();
      },
    },
  ];

  const handleCloseClick = () => {
    aside.handleClose();
  };

  const CloseButton = () => (
    <Box className="aside__close-btn" d={{ base: "block", md: "none" }}>
      <IconButton
        fontSize="1.5rem"
        rounded="md"
        bg="rgba(0, 0, 0, .2)"
        _hover={{ opacity: 0.8 }}
        onClick={handleCloseClick}
      >
        <AiOutlineClose />
      </IconButton>
    </Box>
  );

  return (
    <Flex
      className={`aside ${aside.isOpen ? "aside--open" : "aside--close"}`}
      flexDir="column"
      as="aside"
      bg="brand.white"
      w={dimensions.asideWidth}
      {...rest}
    >
      <Flex
        className="aside__header"
        justifyContent="center"
        alignItems="center"
        as="header"
        h={headerHeight}
        bg="brand.primary"
        color="brand.white"
        px={2}
      >
        {aside.isOpen ? (
          <Box textAlign="center" flex={1}>
            <Brand />
          </Box>
        ) : (
          <Box d={{ base: aside.isOpen ? "block" : "none", md: "block" }}>
            <BrandLogo />
          </Box>
        )}

        <CloseButton />
      </Flex>

      <Box className="aside__main" overflowY="auto" as="main" pt={6} flex={1}>
        <Flex flexDir="column" className="aside__item-list">
          {items.map((item, index) => {
            const activeColors = {
              bg: "brand.secondaryLight",
              color: "brand.secondary",
            };

            const renderItem = (onClick = () => {}) => {
              const renderContent = (item) =>
                aside.isOpen ? (
                  <Flex
                    className="aside__item"
                    key={index}
                    as="button"
                    alignItems="center"
                    textTransform="capitalize"
                    py={4}
                    px={2}
                    w="100%"
                    onClick={onClick}
                    //
                    // Apply `activeStyles`
                    {...(activePage === item.text
                      ? {
                          ...activeColors,
                          rounded: "none",
                          borderLeft: "2px solid",
                          borderColor: "brand.secondary",
                          my: 1,
                        }
                      : {})}
                    _hover={{ ...activeColors, opacity: 0.6 }}
                  >
                    <Icon className="aside__item-icon" ml={2} mr={4}>
                      {item.icon}
                    </Icon>

                    <Text className="aside__item-text" mute>
                      {item.text}
                    </Text>
                  </Flex>
                ) : (
                  <Tooltip title={item.text.toUpperCase()} arrow>
                    <Flex
                      className="aside__item"
                      key={index}
                      as="button"
                      alignItems="center"
                      textTransform="capitalize"
                      py={4}
                      px={2}
                      w="100%"
                      onClick={onClick}
                      //
                      // Apply `activeStyles`
                      {...(activePage === item.text
                        ? {
                            ...activeColors,
                            rounded: "none",
                            borderLeft: "2px solid",
                            borderColor: "brand.secondary",
                            my: 1,
                          }
                        : {})}
                      _hover={{ ...activeColors, opacity: 0.6 }}
                    >
                      <Icon className="aside__item-icon" ml={2} mr={4}>
                        {item.icon}
                      </Icon>

                      <Text className="aside__item-text" mute>
                        {item.text}
                      </Text>
                    </Flex>
                  </Tooltip>
                );

              return item.list ? (
                <Accordion
                  data={[
                    {
                      header: (
                        <Flex
                          className="aside__item"
                          color={
                            activePageHeader === item.text
                              ? "brand.secondary"
                              : "inherit"
                          }
                        >
                          {aside.isOpen ? (
                            <Text
                              className="aside__item-text"
                              type={
                                activePageHeader === item.text
                                  ? "nm-bold"
                                  : "nm-regular"
                              }
                              mute
                            >
                              {item.text}
                            </Text>
                          ) : (
                            <Icon className="aside__item-icon">
                              {item.icon}
                            </Icon>
                          )}
                        </Flex>
                      ),
                      content: item.list.map((miniItem) => (
                        <Link
                          key={miniItem.text}
                          mute
                          href={
                            activePage === miniItem.text
                              ? // if its the same page, no need to change the page again
                                router.asPath
                              : miniItem.href
                          }
                        >
                          {renderContent(miniItem)}
                        </Link>
                      )),
                    },
                  ]}
                  headerProps={{
                    pl: aside.isOpen ? 4 : 2,
                    textTransform: "capitalize",
                  }}
                  contentProps={{
                    p: 0,
                    pl: aside.isOpen ? 2 : 1,
                    fontSize: ".7rem",
                  }}
                />
              ) : (
                renderContent(item)
              );
            };

            const renderItems = (onClick) =>
              item.href ? (
                <Link
                  mute
                  href={
                    // activePage === item.text
                    //   ? // if its the same page, no need to change the page again
                    //     router.asPath
                    //   : item.href
                    item.href
                  }
                >
                  {renderItem(onClick)}
                </Link>
              ) : (
                renderItem(item.onClick)
              );

            return (
              <Fragment key={index}>
                {/* For mobile? onclick will change the page AND close the Aside */}
                {screenWidth < 768 && (
                  <MobileAside
                    renderItems={() => renderItems(handleCloseClick)}
                    handleCloseClick={handleCloseClick}
                  />
                )}

                {/* From Tab? onclick will change the page ONLY */}
                <Box d={{ base: "none", md: "block" }}>{renderItems()}</Box>
              </Fragment>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Aside;
