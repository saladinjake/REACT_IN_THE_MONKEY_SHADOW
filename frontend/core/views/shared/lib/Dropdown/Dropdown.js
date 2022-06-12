import { Box } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";
import { Link } from "../Typography/Link";

const DropdownContent__private = ({
  position = "bottom-right",
  contentProps,
  children,
  flat,
  setShowContent,
  ...rest
}) => {
  const contentRef = useRef();

  const handleClose = () => {
    setShowContent(false);
  };

  const getPosition = () =>
    // Bottom visual positionings
    position === "bottom-center"
      ? {
          top: "70%",
          right: "50%",
          transform: "translateX(50%)",
        }
      : position === "bottom-right"
      ? {
          top: "70%",
          right: flat ? "0px" : "-10px",
          transform: "translateX(0)",
        }
      : position === "bottom-left"
      ? {
          top: "70%",
          left: flat ? "0px" : "-10px",
          transform: "translateX(0)",
        }
      : //
      //
      // Top visual positionings
      position === "top-left"
      ? {
          top: "0",
          right: "70%",
          transform: "translateX(0)",
        }
      : position === "top-right"
      ? {
          top: 0,
          left: "70%",
          transform: "translateX(0)",
        }
      : {};

  return (
    <Box
      ref={contentRef}
      minW="100px"
      pos="absolute"
      zIndex={60}
      transition=".25s"
      onClick={handleClose}
      {...getPosition()}
      {...contentProps}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Dropdown = ({
  position,
  renderTrigger,
  contentProps,
  children,
  flat,
}) => {
  // Master state for display
  const [showContent, setShowContent] = useState(false);

  // extra state for adding a display delay
  const [hide, setHide] = useState(false);

  const handleToggleContent = () => setShowContent((prev) => !prev);
  const handleShowContent = () => setShowContent(true);
  const handleHideContent = () => setShowContent(false);

  const dropdownRef = useRef();

  // Handle hide content
  useEffect(() => {
    const { current: dropdown_el } = dropdownRef;

    const handleHide = () => {
      handleHideContent();
    };

    dropdown_el.addEventListener("mouseleave", handleHide);

    return () => {
      dropdown_el.removeEventListener("mouseleave", handleHide);
    };
  }, []);

  // Handle hide content
  useEffect(() => {
    if (!showContent) {
      const timeoutId = setTimeout(() => setHide(true), 300);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setHide(false);
    }
  }, [showContent]);

  return (
    <Box pos="relative" ref={dropdownRef}>
      {renderTrigger({
        onMouseOver: handleShowContent,
        onClick: handleToggleContent,
      })}

      {!hide && (
        <DropdownContent__private
          contentProps={contentProps}
          position={position}
          flat={flat}
          opacity={showContent ? 1 : 0}
          setShowContent={setShowContent}
        >
          {children}
        </DropdownContent__private>
      )}
    </Box>
  );
};

export const DropdownContent = ({ list, children, ...rest }) => {
  const renderItem = (item, index) => (
    <Box
      key={index}
      p={2}
      borderBottom="1px solid"
      borderColor="brand.gray5"
      _hover={{
        bg: "brand.gray6",
        cursor: "pointer",
      }}
      onClick={item.onClick}
    >
      {item.text}
    </Box>
  );

  return (
    <Box
      w="200px"
      bg="brand.white"
      py={5}
      rounded="md"
      boxShadow="0 0 10px rgba(0, 0, 0, .3)"
      overflow="hidden"
      {...rest}
    >
      {list
        ? list.map((item, index) =>
            item.href ? (
              <Link key={index} mute href={item.href}>
                {renderItem(item)}
              </Link>
            ) : (
              renderItem(item, index)
            )
          )
        : children}
    </Box>
  );
};
