import PropTypes from "prop-types";
import { Heading as HeadingText } from "@chakra-ui/react";
import { Tooltip } from "./Tooltip";

export const FONT_FAMILY = "'Inter', sans-serif";

const getStyle = (type, lineHeight) => {
  switch (type) {
    case "h1":
      return {
        fontSize: { base: "35px", md: "49px" },
        lineHeight: lineHeight || { base: "50px", md: "67px" },
      };
    case "h2":
      return {
        fontSize: { base: "30px", md: "41px" },
        lineHeight: lineHeight || { base: "49px", md: "60px" },
      };
    case "h3":
      return {
        fontSize: { base: "28px", md: "34px" },
        lineHeight: lineHeight || { base: "48px", md: "52px" },
      };
    case "h4":
      return {
        fontSize: { base: "24px", md: "25px" },
        lineHeight: lineHeight || { base: "45px", md: "45px" },
      };
    case "h5":
      return {
        fontSize: { base: "18px", md: "19px" },
        lineHeight: lineHeight || { base: "38px", md: "38px" },
      };
    case "h6":
      return {
        fontSize: { base: "12px", md: "13px" },
        lineHeight: lineHeight || { base: "32px", md: "32px" },
      };

    default:
      break;
  }
};

export const Heading = ({
  children,
  lineHeight,
  toolTip,
  type = "h6",
  mute,
  ...rest
}) => {
  const style = getStyle(type, lineHeight);

  return (
    <Tooltip label={toolTip}>
      <HeadingText
        as={type}
        mb={mute ? 0 : 5}
        {...rest}
        {...style}
        fontFamily={FONT_FAMILY}
      >
        {children}
      </HeadingText>
    </Tooltip>
  );
};

Heading.propTypes = {
  children: PropTypes.any.isRequired,
  toolTip: PropTypes.string,
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};
