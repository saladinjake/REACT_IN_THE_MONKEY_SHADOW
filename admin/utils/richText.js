import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, convertToRaw } from "draft-js";

export const getConvertedStringJson = (editorState) => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

export const getConvertedHTML = (text) => {
  if (typeof text !== "string") {
    text = getConvertedStringJson(text);
  }

  text = JSON.parse(text);

  return stateToHTML(convertFromRaw(text));
};
