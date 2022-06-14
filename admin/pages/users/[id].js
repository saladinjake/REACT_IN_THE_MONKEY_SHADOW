import { useState } from "react";
import {
  Layout,
  Section,
  SomethingWentWrong,
  IconButtonWithTooltip,
  CustomersTableSection,
  OrdersTableSection,
} from "components/pages";
import {
  Text,
  Avatar,
  Button,
  Dropdown,
  DropdownContent,
} from "components/lib";
import buildSEO from "utils/buildSEO";
import { Grid, Box, Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import http from "utils/http";
import dateFormat from "dateformat";
import { Badge, Spinner } from "@chakra-ui/react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import useToast from "hooks/useToast";
import { Chip } from "@material-ui/core";
import colors from "theme/colors";
import usePageTab from "hooks/usePageTab";
import { useRouter } from "next/router";

const pageSEO = buildSEO("User Preview", "Description");

const UserPreviewPage = ({ user, err }) => {
  const toast = useToast();
  const router = useRouter();

  const [role, setRole] = useState({ value: user?.role, loading: false });

  let roleList = [
    { value: "administrator", alias: "admin" },
    { value: "marketer" },
    { value: "customer" },
  ];
  roleList = roleList.filter(({ value }) => value !== role.value || role.alias);

  const handleRoleSelect = async (role) => {
    role = role === "administrator" ? "admin" : role;

    try {
      setRole((prev) => ({ loading: true, value: prev.value }));

      await http.patch(`/users/${user.id}`, { role });

      setRole({
        value: role,
      });
    } catch (err) {
      setRole((prev) => ({ loading: false, value: prev.value }));

      toast.displayToast({
        description: err.message,
        duration: 3500,
      });
    }
  };

  const details = user
    ? [
        { name: "email", value: user.email },
        { name: "ref code", value: user.refCode },
        { name: "registered on", value: dateFormat(user.createdAt) },
        {
          name: "role",
          children: (
            <Flex alignItems="center">
              <Chip
                color={
                  role.value === "admin"
                    ? "primary"
                    : role.value === "marketer"
                    ? "secondary"
                    : "default"
                }
                label={role.value === "admin" ? "administrator" : role.value}
              />

              <Dropdown
                renderTrigger={({ onClick }) => (
                  <IconButtonWithTooltip
                    tip="Change role"
                    icon={
                      role.loading ? (
                        <Spinner size="sm" />
                      ) : (
                        <AiOutlineEdit
                          style={{
                            color: colors.brand.primary,
                            transform: "scale(.8)",
                          }}
                        />
                      )
                    }
                    onClick={onClick}
                    disabled={role.loading}
                    shadow="md"
                    transform="scale(.8)"
                  />
                )}
              >
                <DropdownContent p={1}>
                  <Text
                    type="nm-bold"
                    color="brand.primary"
                    mb={2}
                    p={2}
                    borderBottom="1px solid #eee"
                  >
                    Assign A New Role
                  </Text>

                  <Flex flexDir="column">
                    {roleList.map((item) => (
                      <Button
                        key={item.value}
                        mute
                        p={2}
                        w="100%"
                        _hover={{ bg: "brand.gray5" }}
                        textTransform="capitalize"
                        onClick={handleRoleSelect.bind(null, item.value)}
                      >
                        {item.value}
                      </Button>
                    ))}
                  </Flex>
                </DropdownContent>
              </Dropdown>
            </Flex>
          ),
        },

        {
          name: "status",
          value: !user.deactivated ? "Activated" : "deactivated",
          badge: !user.deactivated ? "green" : "red",
        },
      ]
    : [];

  const tabs = [{ heading: "Orders" }, { heading: "Customers" }];

  const pageTab = usePageTab(tabs);

  return (
    <Layout SEO={pageSEO} page="users">
      {err && (
        <SomethingWentWrong message={err.message} onRetry={router.reload} />
      )}

      {user && (
        <>
          <Section>
            <Flex flexDir={{ base: "column", md: "row" }} py={5}>
              <Grid
                placeItems="center"
                w={{ base: "100%", md: "225px", lg: "300px" }}
                borderRight={{ base: 0, md: "1px solid #eee" }}
                borderBottom={{ base: "1px solid #eee", md: 0 }}
                pb={{ base: 3, md: 0 }}
                mb={{ base: 3, md: 0 }}
              >
                <Avatar md mb={3} />

                <Text type="md-regular" mute textTransform="capitalize">
                  {user.firstName} {user.lastName}
                </Text>
              </Grid>

              <Box ml={5}>
                {details.map((detail) => (
                  <Detail key={detail.name} {...detail} />
                ))}
              </Box>
            </Flex>
          </Section>

          <Section>
            <Tabs colorScheme="green" index={pageTab.index}>
              <TabList>
                {tabs.map((tab) => (
                  <Tab key={tab.heading}>
                    {pageTab.renderHeaderControl({
                      tab,
                      href: {
                        pathname: "/users/[id]",
                        query: { tab: tab.heading },
                      },
                      as: {
                        pathname: `/users/${user.id}`,
                        query: { tab: tab.heading },
                      },
                    })}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                <TabPanel p={0} pt={2}>
                  <OrdersTableSection mute path={`/users/${user.id}/orders`} />
                </TabPanel>
                <TabPanel p={0} pt={2}>
                  <CustomersTableSection
                    mute
                    path={`/users/${user.id}/customers`}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Section>
        </>
      )}
    </Layout>
  );
};

const Detail = ({ name, value, children, inline = true, badge }) => {
  return (
    <Flex
      flexDir={{ base: "column", md: inline ? "row" : "column" }}
      mb={{ base: 4, md: 3 }}
      alignItems="center"
    >
      <Text
        textTransform="capitalize"
        type="nm-bold"
        mb={{ base: 1, md: inline ? 0 : 1 }}
        mr={{ base: 0, md: inline ? 3 : 0 }}
      >
        {name}
      </Text>
      {children ? (
        children
      ) : !badge ? (
        <Text mute>{value}</Text>
      ) : (
        <Badge colorScheme={badge} w="fit-content">
          {value}
        </Badge>
      )}
    </Flex>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const { id } = query;
  const { token } = req.cookies;

  let user = null,
    err = null;

  try {
    const {
      data: { data },
    } = await http.get(`/users/${id}`, { token });

    user = data;
  } catch (error) {
    err = {
      message: error.message.includes("404") ? "User not found" : error.message,
    };
  }

  return {
    props: {
      user,
      err,
    },
  };
};

export default UserPreviewPage;
