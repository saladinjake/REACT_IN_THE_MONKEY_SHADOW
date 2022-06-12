



import { Button, Heading, Icon, Link } from "components/shared/lib/";
import { Section } from "../Section/Section";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineLeft } from "react-icons/ai";
import { Flex } from "@chakra-ui/layout";
import breakpoints from "theme/breakpoints";

export const CartIcon = ({ ...rest }) => <GiShoppingCart {...rest} />;

export const Empty = ({ ...rest }) => {
  return (
    <Section>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h={{ base: "300px", md: "400px" }}
        {...rest}
      >
        <Icon fontSize="400%">
          <CartIcon />
        </Icon>

        <Heading type="h3">Your Cart is empty</Heading>

        <Link mute href="/store">
          <Button leftIcon={<AiOutlineLeft />} variant="secondary">
            Back to Shopping
          </Button>
        </Link>
      </Flex>
    </Section>
  );
};

export const CartAuth = () => (
  <Section py={20} maxW={breakpoints.md}>
    <Flex flexDir="column">
      <Link mute href="/signin?redirect=/cart">
        <Button mb={5} variant="primary" rightIcon={<CartIcon />} w="100%">
          Sign In your Account to View your Cart
        </Button>
      </Link>

      <Link mute href="/signup?redirect=/cart">
        <Button rightIcon={<CartIcon />} w="100%">
          Create an Account to Add to your Cart
        </Button>
      </Link>
    </Flex>
  </Section>
);
