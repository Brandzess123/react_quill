import React from "react";
import ReactDOM from "react-dom";
import { EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleClick = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(nextState);
    console.log(nextState);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="border w-[20%] bg-red-500"
      >
        italic
      </button>
      <Editor
        editorState={editorState}
        // handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </>
  );
}
