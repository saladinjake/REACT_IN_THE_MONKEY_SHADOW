import { CloseButton } from "@chakra-ui/close-button";
import { Box, Flex } from "@chakra-ui/layout";
import { Loader, SomethingWentWrong } from "components/pages";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import breakpoints from "theme/breakpoints";
import http from "utils/http";
import { Heading } from "../Typography/Heading";
import { Link } from "../Typography/Link";

export const TableModal = ({ modal, setModal }) => {
  const router = useRouter();
  const toast = useToast();

  const handleClose = () => {
    setModal(null);
  };

  const [resource, setResource] = useState({});
  const [menuRequest, setMenuRequest] = useState({});

  const handleItemClick = async (handler) => {
    setMenuRequest({ loading: true });

    try {
      await handler();

      toast.displayToast({
        description: "Successfully updated",
        status: "success",
      });
      setMenuRequest({ success: true });
    } catch (error) {
      setMenuRequest({ error: true });

      toast.displayToast({ description: error.message, duration: 5000 });
    }
  };

  useEffect(() => {
    if (menuRequest.success) {
      handleClose();
    }
  }, [menuRequest.success]);

  useEffect(() => {
    let mount = true;

    if (modal.fetchUrl) {
      const fetchResource = async () => {
        if (mount) {
          setResource({ loading: true });
        }

        try {
          const {
            data: { data },
          } = await http.get(modal.fetchUrl);

          if (mount) {
            setResource({ data });
          }
        } catch (err) {
          if (mount) {
            setResource({ error: err.message });
          }
        }
      };

      fetchResource();

      return () => {
        mount = false;
      };
    }
  }, []);

  const contentProps = modal.content
    ? {
        h: { base: "90%", md: "500px" },
        w: { base: "90%", lg: "800px" },
        maxW: breakpoints.lg,
        ...modal.contentProps,
      }
    : {
        w: "300px",
        ...modal.contentProps,
      };

  const renderModalContent = () =>
    resource.data ? (
      modal.content(resource.data)
    ) : (
      <Flex
        pos="absolute"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100%"
      >
        {resource.loading && <Loader h="auto" />}
        {resource.error && (
          <SomethingWentWrong message={resource.error} h="auto" />
        )}
      </Flex>
    );

  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      zIndex={100}
      w="100%"
      h="100%"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, .5)"
        onClick={handleClose}
        cursor="pointer"
      ></Box>

      <Flex
        {...contentProps}
        pt={5}
        bg="brand.white"
        pos="relative"
        zIndex={1}
        overflowY="auto"
        rounded="md"
        boxShadow="0 0 10px rgba(0, 0, 0, .5), 0 0 35px rgba(0, 0, 0, .3)"
      >
        {modal.content && (
          <CloseButton
            pos="absolute"
            zIndex={1}
            top={0}
            right={0}
            onClick={handleClose}
          />
        )}

        {/* Content */}
        {modal.content ? (
          renderModalContent()
        ) : (
          <Box flex={1} pos="relative">
            {menuRequest.loading && (
              <Loader
                pos="absolute"
                top={0}
                left={0}
                zIndex={1}
                h="100%"
                w="100%"
              />
            )}

            <Heading textAlign="center" mute pt={4} pb={8} px={2}>
              {modal.heading}
            </Heading>

            <Flex flexDir="column">
              {modal.list.map((item, index) => {
                const renderBtn = (as) => (
                  <Box
                    key={index}
                    as={as}
                    textAlign="center"
                    px={2}
                    py={3}
                    _hover={{ bg: "brand.gray5" }}
                    borderTop="1px"
                    borderColor="brand.gray5"
                    onClick={as && handleItemClick.bind(null, item.onClick)}
                    {...item.props}
                  >
                    {item.text}
                  </Box>
                );

                return item.href ? (
                  <Link key={index} mute href={item.href}>
                    {renderBtn()}
                  </Link>
                ) : (
                  renderBtn("button")
                );
              })}
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
