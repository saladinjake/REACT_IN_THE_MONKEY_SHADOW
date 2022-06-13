import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { createRangeLite } from "utils/createRange";
import { Icon } from "../Icon/Icon";

export const Ratings = ({
  value: rating,
  color,
  lg,
  sm,
  onChange,
  ...rest
}) => {
  // splits the rating into an Array
  const ratingSlitted = `${rating}`.split(".");
  let ratingsFill = Number(ratingSlitted[0]);
  let ratingHalf = Number(ratingSlitted[1]);

  // checks if the rating's remainder is greater than 5
  ratingHalf = ratingHalf >= 5 ? ratingHalf : 0;

  let ratingsOutline = [];
  let ratingDifference = 0;

  // checks for the ratings difference from 5
  if (ratingHalf) {
    ratingDifference = 5 - Math.round(Number(`${ratingsFill}.${ratingHalf}`));
  } else {
    ratingDifference = 5 - ratingsFill;
  }

  // create Array base on the remaining ratings
  ratingsOutline = createRangeLite(ratingDifference);
  // create Array base on the solid ratings
  ratingsFill = createRangeLite(ratingsFill);

  // computing the size for Large and Small variant
  const getSize = () =>
    lg ? { fontSize: "2rem" } : sm ? { fontSize: "13px" } : {};

  // Handle Click on star
  const handleStarClick = (status, index) => {
    if (onChange) {
      let rating;

      if (status === "fill") {
        rating = index + 1;
      }
      if (status === "outline") {
        rating = index + 1 + ratingsFill.length;
      }

      onChange(rating);
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      w={lg ? "220px" : sm ? "70px" : "110px"}
      cursor={onChange ? "pointer" : "default"}
      {...rest}
    >
      {ratingsFill.map((_, i) => (
        <Icon
          key={i}
          color={color}
          {...getSize()}
          onClick={handleStarClick.bind(null, "fill", i)}
        >
          <BsStarFill />
        </Icon>
      ))}

      {ratingHalf ? (
        <Icon color={color} {...getSize()}>
          <BsStarHalf />
        </Icon>
      ) : null}

      {ratingsOutline.map((_, i) => (
        <Icon
          key={i}
          color={color}
          {...getSize()}
          onClick={handleStarClick.bind(null, "outline", i)}
        >
          <BsStar />
        </Icon>
      ))}
    </Flex>
  );
};

Ratings.propTypes = {
  color: PropTypes.string,
  lg: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
};
