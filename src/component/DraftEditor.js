import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Render from "../component/render";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <>
      <div className="container my-5">
        <Editor
          // toolbarOnFocus //ẩn toolbar khi cần thiết
          toolbar={{
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { urlEnabled: true },
            image: { uploadEnabled: true },
          }}
          defaultEditorState={editorState}
          onEditorStateChange={setEditorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </div>

      <div className="border code-view mt-[120px] h-[500px]">
        <textarea
          className="w-full h-full text-area"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>

      <div className="border code-view mt-[120px] h-[500px]">
        <Render
          htmlString={draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          )}
        />
      </div>
    </>
  );
};

export default TextEditor;
