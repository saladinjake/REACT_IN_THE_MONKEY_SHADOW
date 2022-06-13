import PropTypes from "prop-types";
import { forwardRef, useRef, useState } from "react";
import { Box, Flex, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import {
  VscEye as SeePasswordIcon,
  VscEyeClosed as HidePasswordIcon,
} from "react-icons/vsc";
import { RiFileCopyLine } from "react-icons/ri";
import { Text, IconButton } from "components/lib";
import truncate from "utils/truncate";

export const TextField = forwardRef(
  (
    {
      formGroup,
      id,
      label,
      size,
      textarea,
      select,
      type,
      value,
      mute,
      onChange,
      onBlur,
      onFocus,
      ...rest
    },
    ref
  ) => {
    // Configure `onChange`
    onChange = mute ? () => {} : onChange;

    const [seePassword, setSeePassword] = useState(false);

    const getMuteStyles = () => ({
      bg: mute ? "transparent" : "brand.white",
      opacity: mute ? 0.6 : 1,
      fontWeight: mute ? "500" : "inherit",
      border: "1px solid #ddd",
      _hover: mute && { opacity: 0.6 },
    });

    const fucusStyles = mute ? { _focus: {}, cursor: "default" } : {};

    const getProps = () => ({
      // Style props
      opacity: value ? 1 : 0.6,
      _hover: { opacity: 1 },
      _placeholder: { color: "brand.black2" },
      ...fucusStyles,

      // Properties
      id: id,
      name: id,
      type: type,
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      onFocus: onFocus,
    });

    const handleToggleVisibility = () => setSeePassword((prev) => !prev);

    return (
      <Box mb={3} {...formGroup}>
        {label && (
          <Text
            as="label"
            htmlFor={id}
            type="nm-bold"
            textTransform="capitalize"
            mb={0}
          >
            {label}
          </Text>
        )}

        {select ? (
          <Select
            placeholder="-- select --"
            value={value}
            onChange={onChange}
            {...getProps()}
            {...rest}
            ref={ref}
          >
            {select.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        ) : textarea ? (
          //
          // TextArea
          <Textarea
            minH={mute ? "40px" : "150px"}
            maxH={mute ? "40px" : "auto"}
            pt={4}
            pb={2}
            {...getProps()}
            {...getMuteStyles()}
            value={mute ? truncate(value, 35) : value}
            {...rest}
            ref={ref}
          />
        ) : //
        type === "password" ? (
          //
          // Password
          <Flex
            rounded="md"
            alignItems="center"
            pr={{ base: 1, md: 0 }}
            {...getMuteStyles()}
          >
            <Input
              {...getProps()}
              {...getMuteStyles()}
              borderBottom="none"
              border="none"
              {...rest}
              variant="ghost"
              type={seePassword ? "text" : "password"}
              m={0}
              ref={ref}
            />

            <IconButton
              onClick={handleToggleVisibility}
              alignSelf="center"
              rounded="md"
              variant="ghost"
              disabled={mute}
            >
              {seePassword ? <HidePasswordIcon /> : <SeePasswordIcon />}
            </IconButton>
          </Flex>
        ) : (
          //
          // Normal Input
          <Input {...getProps()} {...getMuteStyles()} {...rest} ref={ref} />
        )}
      </Box>
    );
  }
);

export const ShareLink = ({ refCode }) => {
  const inputRef = useRef();
  const toast = useToast();

  const handleCopied = () => {
    toast.closeAll();

    toast({
      duration: 1 * 1000,
      status: "info",
      description: "Copied to your Clipboard",
      position: "top",
    });
  };

  const handleCopyLink = () => {
    // Select the value in the Input
    inputRef.current.select();

    // Copy to clipboard
    document.execCommand("copy");

    // display copied alert
    handleCopied();
  };

  // const handleInputClick = (e) => {
  //   e.target.select();
  // };

  return (
    <Box>
      <Text type="nm-bold" mb={3}>
        Share your referer link
      </Text>
      <Flex
        bg="brand.white"
        rounded="md"
        pr={{ base: 1, md: 0 }}
        alignItems="center"
        color="brand.success"
      >
        {/* <Tooltip label="Copy your Referer link to your Clipboard"> */}
        <Input
          ref={inputRef}
          value={`sweetdream/join/?refCode=${refCode}`}
          onChange={() => {}}
          onCopy={handleCopied}
          // onClick={handleInputClick}
          variant="ghost"
          bg="transparent"
          cursor="pointer"
        />
        {/* </Tooltip> */}

        <IconButton
          toolTip="Click to copy"
          toolTipPlacement="bottom-end"
          bg="transparent"
          rounded="md"
          onClick={handleCopyLink}
        >
          <RiFileCopyLine />
        </IconButton>
      </Flex>
    </Box>
  );
};

TextField.propTypes = {
  textarea: PropTypes.bool,
  select: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  formGroup: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  mute: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};
