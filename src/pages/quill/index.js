// import { useEffect } from "react";
// import { useQuill } from "react-quilljs";
// // import BlotFormatter from "quill-blot-formatter";
// import dynamic from "next/dynamic";
// import "quill/dist/quill.snow.css";

// const BlotFormatter = dynamic(
//   () => import("quill-blot-formatter").then((mod) => mod.BlotFormatter),
//   { ssr: false }
// );

// const Editor = () => {
//   const { quill, quillRef, Quill } = useQuill({
//     modules: { blotFormatter: {} },
//   });

//   if (Quill && !quill) {
//     // const BlotFormatter = require('quill-blot-formatter');
//     Quill.register("modules/blotFormatter", BlotFormatter);
//   }

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", (delta, oldContents) => {
//         console.log("Text change!");
//         console.log(delta);

//         let currrentContents = quill.getContents();
//         console.log(currrentContents.diff(oldContents));
//       });
//     }
//   }, [quill, Quill]);

//   return (
//     <div>
//       <div ref={quillRef} />
//     </div>
//   );
// };

// export default Editor;

import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function App() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const [value, setValue] = useState("");
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}

export default App;
