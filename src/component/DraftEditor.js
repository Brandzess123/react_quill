// import React, { useState } from "react";
// import { convertToRaw, EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "draft-js/dist/Draft.css";
// import draftToHtml from "draftjs-to-html";
// import dynamic from "next/dynamic";
// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );
// const MyEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   return (
//     <div className="App">
//       <header className="App-header">Rich Text Editor Example</header>
//       <Editor
//         defaultEditorState={editorState}
//         onEditorStateChange={setEditorState}
//       />
//       <div className="code-view">
//         <p>HTML View </p>
//         <textarea
//           className="text-area"
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         />
//       </div>
//     </div>
//   );
// };

// export default MyEditor;

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
