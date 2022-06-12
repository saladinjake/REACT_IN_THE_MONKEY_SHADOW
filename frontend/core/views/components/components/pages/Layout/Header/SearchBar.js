import { Box, Flex } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { Icon, IconButton, TextField } from "components/shared/lib";
import { HeaderModal } from "components/components/pages";
import { useState } from "react";
import useHeaderModal from "hooks/useHeaderModal";

export const SearchBar = ({
  responsive,
  id,
  onSearch,
  placeholder = "Search for Products...",

  ...rest
}) => {
  const headerModal = useHeaderModal();

  const [query, setQuery] = useState("");

  const handleQueryChange = ({ target: { value } }) => setQuery(value);

  const handleQuerySearch = (e) => {
    e.preventDefault();

    onSearch(query);
  };

  const renderSearchBar = () => (
    <Flex
      as="form"
      alignItems="center"
      bg="brand.white"
      border="1px"
      borderColor="brand.gray3"
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
          bg="transparent"
          opacity={0.8}
          _hover={{ opacity: 1 }}
        >
          <BiSearchAlt />
        </IconButton>
      ) : (
        <Icon
          pos="absolute"
          top="50%"
          transform="translateY(-45%)"
          left={4}
          opacity={0.8}
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

  return (
    <>
      <Box d={responsive ? { base: "block", md: "none" } : "none"} {...rest}>
        <IconButton onClick={headerModal.handleToggle}>
          <BiSearchAlt />
        </IconButton>

        <HeaderModal setShow={headerModal.setShow} show={headerModal.show}>
          <Box as="section" p={2}>
            <Box as="header" pt={3} pb={1}>
              {renderSearchBar()}
            </Box>
          </Box>
        </HeaderModal>
      </Box>

      <Box d={responsive ? { base: "none", md: "block" } : "block"} {...rest}>
        {renderSearchBar()}
      </Box>
    </>
  );
};
