import React from "react";
import { render } from "react-dom";
import DraftEditorNew from "../../component/DraftPicture";
import "@draft-js-plugins/image/lib/plugin.css";
import "@draft-js-plugins/focus/lib/plugin.css";
import "@draft-js-plugins/alignment/lib/plugin.css";

const App = () => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: 2,
      boxShadow: "inset 0px 1px 8px -3px #ABABAB",
      padding: 16,
      backgroundColor: "#fefefe",
    }}
  >
    <DraftEditorNew />
  </div>
);

export default App();
