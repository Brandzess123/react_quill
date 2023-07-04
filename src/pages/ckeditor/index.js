import React, { useState, useEffect } from "react";
// import "./styles.css";
import Editor from "../../component/Editor";
import Render from "../../component/render";
import MyComponent from "../../component/render";
export default function App() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  console.log(data);

  return (
    <div className="App">
      <h1>ckEditor 5</h1>

      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />

      {JSON.stringify(data)}

      <div className="mt-[300px] w-full h-[500px] border bg-black text-white">
        <Render htmlString={data} />
      </div>
    </div>
  );
}
