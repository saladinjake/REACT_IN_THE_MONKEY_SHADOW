import { Flex } from "@chakra-ui/layout";
import { Heading, Image, Text } from "components/lib";

export const BrandText = ({ text = "Silver Dream", ...rest }) => {
  return (
    <Heading type="h1" m={0} {...rest}>
      <Text type="md-bold" textTransform="capitalize" m={0}>
        {text}
      </Text>
    </Heading>
  );
};

export const BrandLogo = ({ ...rest }) => {
  const dimension = { base: "35px", md: "40px" };

  return (
    <Image
      src="/images/brand/logo.jpg"
      w={dimension}
      h={dimension}
      quality={100}
      rounded="full"
      {...rest}
    />
  );
};

export const Brand = ({ ...rest }) => (
  <Flex alignItems="center" {...rest}>
    <BrandLogo mr={2} />
    <BrandText />
  </Flex>
);

export default Brand;
