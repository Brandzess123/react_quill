import React, { useState, useEffect } from "react";

import { EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import "./styles.css";

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = React.useRef(null);

  //   function focusEditor() {
  //     editor.current.focus();
  //   }

  useEffect(() => {
    // focusEditor();
  }, []);

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return <button onMouseDown={onClickButton}>{props.label}</button>;
  };

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
  ];

  const BlockStyleControls = (props) => {
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];
  const InlineStyleControls = (props) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };

  return (
    // onClick={focusEditor}
    <div>
      <div className="App">
        <BlockStyleControls onToggle={onBlockClick} />
        <InlineStyleControls onToggle={onInlineClick} />
      </div>
      <div className="App">
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
        />
      </div>
    </div>
  );
}

export default App;
