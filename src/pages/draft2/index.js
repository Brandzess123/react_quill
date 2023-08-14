import React from "react";
import ReactDOM from "react-dom";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import MyComponent from "../../component/render";
import { useState } from "react";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleClick = (check) => {
    console.log(check);
    if (check === "bold") {
      console.log("1");
      const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
      setEditorState(nextState);
    } else if (check === "italic") {
      const nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
      setEditorState(nextState);
      console.log("2");
    } else if (check === "underline") {
      console.log("3");
      const nextState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
      setEditorState(nextState);
    }
    // const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    // setEditorState(nextState);
    // console.log(nextState);
  };

  return (
    <>
      <div className="w-full border overflow-scroll h-[500px] p-5">
        <button
          onClick={() => handleClick("bold")}
          type="button"
          className="border w-[20%] bg-red-500"
        >
          bold
        </button>
        <button
          onClick={() => handleClick("italic")}
          type="button"
          className="border w-[20%] bg-red-500"
        >
          italic
        </button>
        <button
          onClick={() => handleClick("underline")}
          type="button"
          className="border w-[20%] bg-red-500"
        >
          underline
        </button>
        <Editor
          editorState={editorState}
          // handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
      <MyComponent
        className="mt-[120px]"
        htmlString={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </>
  );
}
