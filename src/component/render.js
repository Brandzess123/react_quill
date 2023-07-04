import React from "react";

const MyComponent = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default MyComponent;
