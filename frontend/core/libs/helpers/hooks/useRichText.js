import { EditorState, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { getConvertedStringJson } from "utils/richText";

const useRichText = (initialEditorState) => {
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());

  useEffect(() => {
    if (initialEditorState) {
      if (typeof initialEditorState !== "string") {
        initialEditorState = getConvertedStringJson(initialEditorState);
      }

      initialEditorState = JSON.parse(initialEditorState);

      const editorState = EditorState.createWithContent(
        convertFromRaw(initialEditorState)
      );

      setEditorState(editorState);
    }
  }, []);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleClear = () => {
    setEditorState(EditorState.createEmpty());
  };

  return {
    editorState,
    onEditorChange: handleEditorChange,
    handleClear,
  };
};

export default useRichText;
