import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Heading,
  Link,
  RecentlyViewed,
  ShareLink,
  Text,
} from "components/shared/lib";
import { AccountAuth, Layout, PageHeader, Section } from "components/components/pages";
import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";
import { ImCreditCard } from "react-icons/im";
import { GrUserSettings } from "react-icons/gr";
import breakpoints from "theme/breakpoints";
import buildSEO from "utils/buildSEO";
import { useEffect } from "react";
import useOrders from "hooks/useOrders";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { toNaira } from "utils/formatPrice";
import useToast from "hooks/useToast";

const pageSEO = buildSEO("My Account", "Your Dashboard");

const EditDataSection = ({ ...rest }) => (
  <ButtonGroup spacing="3" {...rest}>
    <Link href="/preference" mute>
      <Button rightIcon={<ImCreditCard />} sm>
        Edit Preference
      </Button>
    </Link>

    <Link href="/account/edit" mute>
      <Button rightIcon={<GrUserSettings />} sm>
        Edit Account
      </Button>
    </Link>
  </ButtonGroup>
);

const Wallet = ({ auth, ...rest }) => {
  const toast = useToast();

  const handleWithdraw = () => {
    if (auth.currentUser?.role === "marketer") {
      toast.displayToast({
        description: "Withdraw successful",
        status: "success",
      });
    } else {
      toast.displayToast({
        description: "Cannot withdraw at the moment",
        status: "info",
      });
    }
  };

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      textAlign={{ base: "center", md: "left" }}
      alignItems={{ base: "center", md: "stretch" }}
      bg="brand.secondaryLight"
      p={2}
      rounded="md"
      shadow="lg"
      {...rest}
    >
      <Stat p={5}>
        <StatLabel color="brand.secondary">User wallet</StatLabel>
        <StatNumber>{toNaira(576000)}</StatNumber>

        <Box textAlign="right" pt={{ base: 2, md: 0 }}>
          <Button
            sm
            variant="secondary"
            w={{ base: "100%", md: "auto" }}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </Box>
      </Stat>
    </Flex>
  );
};

const AccountPage = () => {
  const cart = useCart();
  const orders = useOrders();
  const auth = useAuth();
  const { currentUser } = auth;

  useEffect(() => {
    orders.fetch();
  }, []);

  // For Orders and Cart display
  const itemsOverview = [
    { name: "cart", value: cart?.count },
    { name: "orders", value: orders?.loading ? "..." : orders.count },
    { name: "referrers", value: 0 },
  ];

  return (
    <Layout SEO={pageSEO} bg="brand.gray6">
      <PageHeader>My Account</PageHeader>

      {auth.isAuthenticated ? (
        <>
          <Section pb={{ base: 10, md: 16 }}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "flex-end" }}
              justifyContent="space-between"
            >
              <Flex>
                <Avatar md />

                <Box ml={5}>
                  <Heading m={0}>{auth.fullName}</Heading>
                  <Text>{currentUser.email}</Text>

                  <EditDataSection d={{ base: "none", md: "flex" }} />
                </Box>
              </Flex>

              <EditDataSection d={{ base: "flex", md: "none" }} my={5} />

              <Box
                flex={1}
                w="full"
                maxW="400px"
                ml={{ md: 6 }}
                mt={{ base: 4, md: 0 }}
              >
                <ShareLink refCode={currentUser.refCode} />
              </Box>
            </Flex>
          </Section>

          <Section pb={{ base: 16, md: 20 }}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "flex-start" }}
              justifyContent="space-between"
            >
              <Box
                flex={{ md: "0 0 350px" }}
                w={{ base: "100%", md: "auto" }}
                py={2}
                px={5}
                rounded="md"
                shadow="lg"
                bg="brand.white"
                maxW={breakpoints.sm2}
                mr={{ md: 6 }}
                mt={{ base: 4, md: 0 }}
                order={{ base: "1", md: "0" }}
              >
                {itemsOverview.map((item, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                    h="70px"
                    px={3}
                    //
                    borderTop={index && "2px"}
                    borderColor={index && "brand.gray6"}
                  >
                    <Link href={`/${item.name}`}>
                      <Text mute type="nm-bold" textTransform="capitalize">
                        {item.name}
                      </Text>
                    </Link>
                    <Text mute type="nm-bold">
                      {item.value}
                    </Text>
                  </Flex>
                ))}
              </Box>

              <Wallet
                auth={auth}
                flex={{ md: "0 1 400px" }}
                w={{ base: "100%", md: "auto" }}
              />
            </Flex>
          </Section>

          <RecentlyViewed pb={20} />
        </>
      ) : (
        <AccountAuth />
      )}
    </Layout>
  );
};

export default AccountPage;
