import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";

function HtmlEditor() {
  // const { quill, quillRef } = useQuill();
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });
  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }
  //==========================================================

  const [value, setValue] = useState();

  //b2
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldContents) => {
        console.log(quillRef.current.firstChild.innerHTML);
        setValue(quillRef.current.firstChild.innerHTML);

        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);

  // console.log(value);
  console.log(JSON.stringify(value));
  // console.log(quillRef);
  return (
    <div>
      <div className="mt-[50px] mx-auto " style={{ width: 1500, height: 1300 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}
export default HtmlEditor;
