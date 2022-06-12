import { Flex } from "@chakra-ui/layout";
import { Button, IconButton, Link, Text } from "components/shared/lib";
import { BsPlus, BsDash } from "react-icons/bs";

export const Counter = ({ qty = 1, onQtyIncrease, onQtyDecrease, type2 }) => {
  const getTypeIconStyles = () =>
    type2
      ? {
          bg: "brand.primary",
          color: "brand.white",
          rounded: "md",
          _hover: { opacity: 0.8 },
        }
      : {};

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      border={type2 ? "none" : { base: 0, md: "1px solid #ddd" }}
      rounded={type2 ? "md" : "3rem"}
      w={type2 ? "100%" : "fit-content"}
    >
      <IconButton
        {...getTypeIconStyles()}
        onClick={onQtyDecrease}
        disabled={qty <= 1}
      >
        <BsDash />
      </IconButton>

      <Text
        color={type2 ? "brand.primary" : "brand.black2"}
        type="nm-bold"
        mb={0}
        mx={3}
      >
        {qty}
      </Text>

      <IconButton {...getTypeIconStyles()} onClick={onQtyIncrease}>
        <BsPlus />
      </IconButton>
    </Flex>
  );
};

export const BuyItem = ({
  inCartLabel,
  cart,
  item: data,
  text = "Add to cart",
  responsive,
  ...rest
}) => {
  
  const item =
    cart.data && [...cart.data].find((item) => item.productId === data.id);

  const handleQtyIncrease = () => {
    cart.increaseQty(item);
  };
  const handleQtyDecrease = () => {
    cart.decreaseQty(item);
  };
  const handleItemBuy = () => {
    cart.addItem(data, currentUser);
  };

  const renderButton = (onClick) => (
    <Button
      variant="primary"
      leftIcon={<CartIcon />}
      responsive={responsive && <CartIcon />}
      {...rest}
      onClick={onClick}
      disabled={!cart.isReady}
    >
      {text}
    </Button>
  );

  return (
    <>
      {inCartLabel && item ? inCartLabel : null}

   
    </>
  );
};
