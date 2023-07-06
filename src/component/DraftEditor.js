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
import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
      </div>
    );
  }
}
