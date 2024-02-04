/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function InputRichText({ InputWatch, InputSetValue }) {
  const editorContent = InputWatch("description");

  return (
    <ReactQuill
      theme="snow"
      className="h-4"
      style={{ marginBottom: "1rem" }}
      value={editorContent}
      onChange={(editorState) => {
        InputSetValue("brif", editorState);
      }}
    />
  );
}
