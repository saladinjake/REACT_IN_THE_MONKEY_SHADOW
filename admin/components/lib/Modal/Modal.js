import {
  Modal as ModalUI,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "../Button/Button";

export const Modal = ({
  renderTrigger,
  scrollBehavior,
  children,
  size = "lg",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = uuid();

  const marginForFullSize =
    size === "full" ? { mx: { base: 2, md: 6 }, my: 6 } : { mx: 2 };

  return (
    <>
      {renderTrigger({ handleOpen: onOpen, id })}

      <ModalUI
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
      >
        <ModalOverlay />

        <ModalContent {...marginForFullSize}>
          <ModalCloseButton />

          <ModalBody>
            <Box className={`${id}`}>
              {children({ handleClose: onClose, id })}
            </Box>
          </ModalBody>
        </ModalContent>
      </ModalUI>
    </>
  );
};

export const ConfirmBox = ({
  renderTrigger,
  renderCancel = ({ handleClose }) => (
    <Button onClick={handleClose}>Cancel</Button>
  ),
  renderConfirm,
  heading,
  children,
}) => {
  const cancelRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => onClose();

  return (
    <>
      {renderTrigger({ handleOpen })}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {heading}
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              {renderCancel({ handleClose })}
              <Box ml={3}>
                {renderConfirm({
                  props: {
                    sm: true,
                    bg: "brand.errorLight",
                    color: "brand.error",
                  },
                  handleClose,
                })}
              </Box>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
