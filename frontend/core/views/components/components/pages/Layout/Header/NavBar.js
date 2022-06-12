import { Badge, Box, ButtonGroup, Flex } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownContent,
  IconButton,
  Link,
} from "components/shared/lib";
import { CartIcon } from "components/components/pages";
import { RiMenuFill } from "react-icons/ri";
import useCart from "hooks/useCart";
import useAuth from "hooks/useAuth";

const Avatar_ = ({ ...rest }) => (
  <IconButton variant="ghost" {...rest}>
    <Avatar />
  </IconButton>
);

const NavBar = ({ ...rest }) => {
  const auth = useAuth();
  const cart = useCart();

  const { currentUser } = auth;

  const authDropdownList = [
    { text: "My Profile", href: "/account" },
    { text: "My Orders", href: "/orders" },
    {
      text: "Logout",
      onClick: () => auth.signout(),
    },
  ];

  if (!currentUser?.isActivated) {
    authDropdownList.push({
      text: "Verify My Account",
      href: "/verify-account"
    });
  }

  if (currentUser?.role === "marketer") {
    authDropdownList.splice(2, 0, {
      text: "My Customers",
      href: "/customers",
    });
  }

  const renderCartIcon = () => (
    <Link mute href="/cart">
      <IconButton pos="relative" variant="ghost">
        <CartIcon fontSize="150%" />

        <Badge
          variant="solid"
          colorScheme="green"
          fontSize=".9rem"
          pos="absolute"
          top={0}
          right={0}
        >
          {cart?.count}
        </Badge>
      </IconButton>
    </Link>
  );

  const renderContent = () =>
    auth.isAuthenticated ? (
      <ButtonGroup>
        <Dropdown
          renderTrigger={({ onMouseOver }) => (
            <Avatar_ onMouseOver={onMouseOver} />
          )}
        >
          <DropdownContent list={authDropdownList} />
        </Dropdown>

        {renderCartIcon()}
      </ButtonGroup>
    ) : (
      <>
        {/* For Mobile viewport */}
        <Box d={{ base: "block", md: "none" }}>
          <ButtonGroup>
            <Dropdown
              renderTrigger={({ onMouseOver }) => (
                <IconButton variant="ghost" onMouseOver={onMouseOver}>
                  <RiMenuFill />
                </IconButton>
              )}
            >
              <DropdownContent
                list={[
                  { text: "Sign In", href: "/signin" },
                  { text: "Sign Up", href: "/signup" },
                ]}
              />
            </Dropdown>

            {renderCartIcon()}
          </ButtonGroup>
        </Box>

        {/* From Tab viewport to Bigger ones */}
        <Flex d={{ base: "none", md: "flex" }}>
          <Link href="/signin" mute>
            <Button sm mr={2} variant="primary">
              Sign in
            </Button>
          </Link>

          <Link href="/signup" mr={2} mute>
            <Button sm>Sign up</Button>
          </Link>

          {renderCartIcon()}
        </Flex>
      </>
    );

  return (
    <Box as="nav" {...rest}>
      {renderContent()}
    </Box>
  );
};

export default NavBar;
