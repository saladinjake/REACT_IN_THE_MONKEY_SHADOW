import { Button, ConfirmBox, Image } from "components/lib";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { BsPlus } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import usePageReady from "hooks/usePageReady";
// import { Image } from "@chakra-ui/image";
import http from "utils/http";
import useToast from "hooks/useToast";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BiCloudUpload, BiReset } from "react-icons/bi";
import colors from "theme/colors";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { Loader } from "../Feedback/Feedback";

// const handleImageUpload = ({ imageFile, toast, productId }) => {
//   const formData = new FormData();

//   formData.append("file", imageFile);

//   console.log(imageFile, formData);

//   http
//     .post(`/products/${productId}/images`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .catch((err) => {
//       toast.displayToast({
//         description: err.message,
//       });
//     });
// };

//

// export const ImageUpload = ({ product }) => {
//   const toast = useToast();

//   const [additionalImages, setAdditionalImages] = useState([
//     { id: Math.random() },
//   ]);

//   const handleImagesChange = ({ file }) => {
//     const images = [...additionalImages];
//     images[images.length - 1].file = file;
//     images.push({ id: Math.random() });

//     console.log(images);

//     setAdditionalImages(images);
//   };

//   const handleRemoveImage = (id) => {
//     const newImages = additionalImages.filter((image) => image.id !== id);

//     setAdditionalImages(newImages);
//   };

//   const handleUploadAdditionalImages = () => {
//     const files = additionalImages
//       .filter((image) => image.file)
//       .map((image) => ({ file: image.file }));

//     files.forEach(({ file }) => {
//       handleImageUpload({ imageFile: file, toast, productId: product.id });
//     });
//   };

//   const handleResetAdditionalImages = () => {
//     setAdditionalImages([{ id: Math.random() }]);
//   };

//   useEffect(() => {
//     if (additionalImages.length === 4) {
//       const images = [...additionalImages];

//       images.pop();

//       setAdditionalImages(images);
//     }
//   }, [additionalImages.length]);

//   return (
//     <>
//       <UploadImage
//         productId={product.id}
//         mb={10}
//         showUpload={toast}
//         productImageSrc={product.imageUrl}
//       />

//       <Box>
//         <Flex flexWrap="wrap">
//           {additionalImages.map((image) => (
//             <UploadImage
//               productId={product.id}
//               key={image.id}
//               id={image.id}
//               w="100px"
//               mr={2}
//               onAddImage={handleImagesChange}
//               onChangeImage={handleRemoveImage.bind(null, image.id)}
//               showChange={
//                 additionalImages.filter((image) => image.file).length < 3
//               }
//               sm
//             />
//           ))}
//         </Flex>

//         {additionalImages.filter((image) => image.file).length > 0 && (
//           <Flex justifyContent={{ md: "flex-end" }} mt={2}>
//             {additionalImages.filter((image) => image.file).length === 3 && (
//               <Button
//                 w={{ base: "100%", md: "auto" }}
//                 sm
//                 mt={2}
//                 onClick={handleResetAdditionalImages}
//                 leftIcon={<BiReset />}
//               >
//                 Reset all images
//               </Button>
//             )}

//             <Button
//               w={{ base: "100%", md: "auto" }}
//               sm
//               mt={2}
//               variant="primary"
//               onClick={handleUploadAdditionalImages}
//               leftIcon={<BiCloudUpload />}
//             >
//               Upload additions images
//             </Button>
//           </Flex>
//         )}
//       </Box>
//     </>
//   );
// };

export const ImageUpload = ({ product, setProduct }) => {
  const toast = useToast();
  const router = useRouter();

  const primaryImage = product.primaryImage;

  const [requestFeedback, setRequestFeedback] = useState({});

  const timeoutId = useRef();
  let componentIsMount = true;

  useEffect(() => {
    return () => {
      componentIsMount = false;
      clearTimeout(timeoutId.current);
    };
  }, []);

  const handleDelete = async (id, handleClose) => {
    setRequestFeedback({ loading: true });
    handleClose();

    try {
      await http.delete(`/products/${product.id}/images/${id}`);

      const images = [...product.images];
      const imageIndex = images.findIndex((img) => img._id === id);

      images.splice(imageIndex, 1);

      setProduct({ images });
      setRequestFeedback({});

      toast.displayToast({
        description: "Image successfully deleted",
        status: "success",
      });
    } catch (err) {
      setRequestFeedback({});
      toast.displayToast({ description: err.message });
    }
  };

  const handleChangePrimary = async (id) => {
    setRequestFeedback({ loading: true });

    try {
      const {
        data: { message },
      } = await http.patch(`/products/${product.id}/images/${id}`, {
        isPrimary: true,
      });

      // TODO: check if the control works :)
      if (!product.primaryImage) {
        router.reload();
      }

      const images = [...product.images].map((img) => ({
        ...img,
        isPrimary: false,
      }));

      const imageIndex = images.findIndex((img) => img._id === id);
      images[imageIndex] = { ...images[imageIndex], isPrimary: true };

      setProduct({ images, primaryImage: images[imageIndex] });
      setRequestFeedback({});

      toast.displayToast({
        description: message,
        status: "success",
      });
    } catch (err) {
      setRequestFeedback({});
      toast.displayToast({ description: err.message });
    }
  };

  const handleImageUpload = async ({ target: { files } }) => {
    setRequestFeedback({ loading: true });

    try {
      const formData = new FormData();

      formData.append("image", files[0]);

      const {
        data: { data, message },
      } = await http.post(`/products/${product.id}/images`, formData, {});

      const images = [...product.images];
      images.push(data);

      setProduct({ images });
      setRequestFeedback({});

      toast.displayToast({
        description: message,
        status: "success",
      });
    } catch (err) {
      setRequestFeedback({});
      toast.displayToast({ description: err.message });
    }
  };

  return (
    <Box py={5} pos="relative">
      {requestFeedback.loading && (
        <Loader
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          zIndex={2}
          bg="rgba(225, 225, 225, 0.8)"
          alignItems="center"
          justifyContent="center"
        />
      )}

      {primaryImage && (
        <Image
          src={primaryImage.imageUrl}
          isProduct
          w="200px"
          h="200px"
          border={`2px solid ${colors.brand.primary}`}
          mb={5}
        />
      )}

      <Flex flexWrap="wrap">
        {product.images.map((image) => (
          <Box
            key={image._id}
            pos="relative"
            mr={5}
            mb={5}
            shadow="md"
            rounded="md"
            overflow="hidden"
            className="image__box"
            w="130px"
            h="130px"
          >
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              variant="error"
              pos="absolute"
              right={0}
              top={0}
              zIndex={1}
              w="100%"
              h="100%"
              bg="brand.gray6"
              opacity={0}
              className="image__overlay"
            >
              <Button
                sm
                variant="primary"
                w="100%"
                mb={1}
                onClick={handleChangePrimary.bind(null, image._id)}
                disabled={image.isPrimary}
              >
                Set As Primary
              </Button>

              <ConfirmBox
                renderTrigger={({ handleOpen }) => (
                  <Button sm variant="error" w="100%" onClick={handleOpen}>
                    Delete Image
                  </Button>
                )}
                renderConfirm={({ props, handleClose }) => (
                  <Button
                    onClick={handleDelete.bind(null, image._id, handleClose)}
                    leftIcon={<FaTrashAlt />}
                    {...props}
                  >
                    Yes Delete this image
                  </Button>
                )}
              >
                Are you sure you want to delete this image?
              </ConfirmBox>
            </Flex>

            <Image src={image.imageUrl} isProduct w="130px" h="130px" />
          </Box>
        ))}

        <UploadImage onImageUpload={handleImageUpload} />
      </Flex>
    </Box>
  );
};

const UploadImage = ({ onImageUpload }) => {
  return (
    <Flex
      w="130px"
      h="130px"
      justifyContent="center"
      alignItems="center"
      borderWidth="3px"
      borderStyle="dashed"
      borderColor="brand.gray3"
      rounded="md"
      flexDir="column"
    >
      <UploadButton onImageUpload={onImageUpload} />
    </Flex>
  );
};

const UploadButton = ({ onImageUpload }) => {
  const id = Math.random();

  const uploadRef = useRef();
  const pageReady = usePageReady();

  // Simulate clicking on a focused element ("Unload-Button")
  useEffect(() => {
    const { current: upload_el } = uploadRef;

    if (upload_el) {
      upload_el.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          upload_el.click();
        }
      });
    }
  }, [pageReady]);

  const handleImageSelect = (e) => {
    onImageUpload(e);
  };

  return (
    <Flex
      as="label"
      htmlFor={id}
      justifyContent="center"
      alignItems="center"
      tabIndex={0}
      ref={uploadRef}
      w="60px"
      h="60px"
      bg="brand.primary"
      color="brand.white"
      fontSize="2rem"
      rounded="full"
      cursor="pointer"
      transition=".15s"
      _hover={{ transform: "scale(1.3)" }}
    >
      <BsPlus />

      <Input
        id={id}
        type="file"
        d="none"
        onChange={handleImageSelect}
        accept="image/*"
      />
    </Flex>
  );
};
