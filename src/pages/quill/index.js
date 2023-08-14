import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);
// const Quill = dynamic(() => import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// const Quill = dynamic(() => import("react-quill"), { ssr: false });
const Quill = dynamic(() => import("react-quill").then((mod) => mod.default), {
  ssr: false,
});
const ImageResize = dynamic(() => import("quill-image-resize-module-react"), {
  ssr: false,
});
// const Quill = dynamic(
//   async () => {
//     // const Quill = await require("react-quill").Quill;
//     // const { default: ImageResize } = await import(
//     //   "quill-image-resize-module-react"
//     // );
//     return new Promise(async (resolve, reject) => {
//       const Quill = await require("react-quill").Quill;
//       const ImageResize = (await import("quill-image-resize-module-react"))
//         .default;
//       resolve({ Quill, ImageResize });
//     }).then(({ Quill, ImageResize }) => {
//       // Quill.register("modules/blotFormatter", BlotFormatter);
//       Quill.register("modules/imageResize", ImageResize);
//       return;
//     });
//     return ({ forwardedRef, ...props }) => (
//       <Quill ref={forwardedRef} {...props} />
//     );

//     // return function forwardRef({ forwardedRef, ...props }) {
//     //   return <Quill ref={forwardedRef} {...props} />;
//     // };
//   },
//   {
//     ssr: false,
//   }
// );

import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import MyComponent from "../../component/render";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase/config";

// const ImageResize = dynamic(() => import("quill-image-resize-module-react"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// window.Quill = Quill;

function App() {
  var quillRef = useRef(null);

  const test =
    '<img style="width: 30%; margin: 0 auto;" src="https://firebasestorage.googleapis.com/v0/b/starlit-braid-388001.appspot.com/o/image%2Fta%CC%89i%20xu%C3%B4%CC%81ng.png?alt=media&amp;token=9fffb1a6-43a9-46a4-a628-15279ef371fa">';

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],

        handlers: {
          image: () => quillImageCallBack(),
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
        // imageResize: {
        //   module: ImageResize,
        //   parchment: Quill.import("parchment"),
        // },
      },
    }),
    []
  );

  async function uploadFiles(imageFile, filename, quillRef) {
    const editor = quillRef.current.getEditor();
    if (imageFile) {
      console.log("nó chạy");
      const storageRef = ref(storage, `image/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);
            var x = "margin: 0 auto;";
            let existingDelta = editor.getContents();

            let delta = {
              ops: [
                {
                  attributes: {
                    alt: filename,
                  },
                  insert: {
                    image: url,
                  },
                },
              ],
            };
            let combinedDelta = existingDelta.concat(delta);
            // console.log(combinedDelta);
            editor.setContents(combinedDelta);
            editor.focus();

            // editor.insertEmbed(editor.getSelection(), "image", url);
          });
        }
      );
    } else {
    }
  }

  const quillImageCallBack = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      var file = input.files[0];
      var formData = new FormData();
      formData.append("image", file);

      var fileName = file.name;
      console.log(file + "\n" + fileName);
      const res = await uploadFiles(file, fileName, quillRef); //, quillObj
      // await console.log("giá trị value là: " + value);
      // const bbq = value;

      // bbq.replace(/<img/g, '<img style="width: 30%; margin: 0 auto;" ');
      // setValue(bbq);
      // console.log("after test");
      // console.log("đay là giá trị test" + newText);
    };
  };

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [check, setcheck] = useState(true);

  function updateshit() {
    setcheck(!check);
    console.log(check);
    console.log("chạy");

    const x = value.replace(/img(?!\style)/g, 'img style="margin:0 auto;" '); // width: 100%;
    console.log(x);

    setValue2(x);
    setValue(x);
  }

  return (
    <>
      <div className="w-[60%] mx-auto h-full overflow-scroll">
        <div className="overflow-scroll h-[700px] ">
          <ReactQuill
            forwardedRef={quillRef}
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={"Start typing ..."}
          />
        </div>
        <button
          onClick={updateshit}
          className="w-[25%] text-white bg-black border rounded-md "
        >
          {!check ? " Update attributes" : "Original attributes"}
        </button>

        <div className="mt-[100px]">
          <MyComponent htmlString={!check ? value2 : value} />
        </div>

        {/* color:
#525050
font-family:
Tahoma
font-size:
15px
font-weight:
700
margin:
0px 0px 20px */}
        <div className="mt-[100px]">
          <h2>console.log</h2>
          <ReactQuill value={value} readOnly={true} theme={"bubble"} />
        </div>
      </div>
    </>
  );
}

export default App;
