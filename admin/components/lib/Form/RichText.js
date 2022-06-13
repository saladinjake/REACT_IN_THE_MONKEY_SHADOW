import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { Box } from "@chakra-ui/react";
import { Text } from "../Typography/Text";

export const RichText = ({
  editorState,
  onEditorChange,
  label,
  placeholder,
  id,
  ...rest
}) => {
  return (
    <>
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

      <Box border="1px" borderColor="brand.gray5" rounded="md" {...rest}>
        <Editor
          id={id}
          editorClassName="richtext-content"
          editorState={editorState}
          onEditorStateChange={onEditorChange}
          placeholder={placeholder}
        />
      </Box>
    </>
  );
};
