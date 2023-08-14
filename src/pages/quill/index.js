import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/render.module.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import Render from "../../component/render";
const ImageResize = dynamic(() => import("quill-image-resize-module-react"), {
  ssr: false,
});

const Quill = dynamic(() => import("react-quill").then((mod) => mod.Quill), {
  ssr: false,
});
// Quill.register("modules/imageResize", ImageResize);
import "react-quill/dist/quill.snow.css";

function App() {
  function imageHandler() {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async function () {
      var file = input.files[0];
      var formData = new FormData();
      formData.append("image", file);
      var fileName = file.name;

      this.uploadFiles(file, fileName, quillObj)
        .then(function (res) {
          // Xử lý kết quả trả về
        })
        .catch(function (error) {
          // Xử lý lỗi (nếu có)
        });
    };
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
      [{ color: [] }],
    ],
  };

  const [value, setValue] = useState("");
  console.log(value);
  return (
    <>
      <div className="w-[80%] overflow-scroll mx-auto h-[700px]">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>

      <div className="mt-[200px] border text-base test">
        <div className="my-[200px]">
          {" "}
          <h2 className="">This is the result</h2>
          {value}
        </div>

        <div className="w-[80%] mx-auto border">
          <div className={styles.normal}>
            {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
            <ReactQuill
              value={value}
              readOnly={true}
              theme={"bubble"}
              className="test"
            />
          </div>
        </div>

        {/* <Render htmlString={value} /> */}
      </div>
    </>
  );
}

export default App;
