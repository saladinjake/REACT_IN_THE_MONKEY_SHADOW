import { Box, Flex } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { Icon, IconButton, TextField } from "components/lib";
import { headerHeight } from "components/pages";
import { useEffect, useRef, useState } from "react";

const Modal = ({ children, showModal, setShowModal }) => {
  const [hide, setHide] = useState(false);

  const modalRef = useRef();

  const handleClose = () => {
    setShowModal(false);
  };

  // Handle hide content
  useEffect(() => {
    if (!showModal) {
      const timeoutId = setTimeout(() => setHide(true), 300);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setHide(false);
    }
  }, [showModal]);

  return (
    !hide && (
      <Box
        ref={modalRef}
        pos="fixed"
        top={{ base: headerHeight.base + "px", lg: headerHeight.lg + "px" }}
        left={0}
        w="100%"
        h={{
          base: `calc(100vh - ${headerHeight.base}px)`,
          lg: `calc(100vh - ${headerHeight.lg}px)`,
        }}
        translate=".25s"
        opacity={showModal ? 1 : 0}
      >
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, .2)"
          onClick={handleClose}
          cursor="pointer"
        ></Box>

        <Flex
          bg="brand.white"
          overflowY="scroll"
          boxShadow="inset 0 2px 2px rgba(0, 0, 0, .05)"
          pos="relative"
          zIndex={1}
        >
          <Box flex={1}>{children}</Box>
        </Flex>
      </Box>
    )
  );
};

export const SearchBar = ({
  responsive,
  id,
  onSearch,
  placeholder = "Search for Products...",

  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const handleQuerySearch = (e) => {
    e.preventDefault();

    onSearch(query);
  };

  const renderSearchBar = () => (
    <Flex
      as="form"
      // alignItems="center"
      bg="brand.white"
      border="1px"
      borderColor="brand.gray4"
      rounded="md"
      onSubmit={handleQuerySearch}
      w="100%"
      overflow="hidden"
      pos="relative"
    >
      {query ? (
        <IconButton
          type="submit"
          order={1}
          rounded="none"
          bg="brand.secondaryLight"
          color="brand.secondary"
          opacity={1}
          _hover={{ opacity: 0.75 }}
          h="100%"
          w="50px"
        >
          <BiSearchAlt />
        </IconButton>
      ) : (
        <Icon
          pos="absolute"
          top="50%"
          transform="translateY(-45%)"
          left={4}
          opacity={0.4}
        >
          <BiSearchAlt />
        </Icon>
      )}
      <TextField
        m={0}
        pl={query ? 2 : 10}
        pr={2}
        formGroup={{
          flex: 1,
          m: 0,
        }}
        value={query}
        onChange={handleQueryChange}
        placeholder={placeholder}
        bg="transparent"
        rounded="none"
        border="none"
      />
    </Flex>
  );

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Box d={responsive ? { base: "block", md: "none" } : "none"} {...rest}>
        <IconButton onClick={handleShowModal}>
          <BiSearchAlt />
        </IconButton>

        <Modal setShowModal={setShowModal} showModal={showModal}>
          <Box as="section" p={2}>
            <Box as="header" pt={3} pb={1}>
              {renderSearchBar()}
            </Box>
          </Box>
        </Modal>
      </Box>

      <Box d={responsive ? { base: "none", md: "block" } : "block"} {...rest}>
        {renderSearchBar()}
      </Box>
    </>
  );
};
