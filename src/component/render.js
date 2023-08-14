import React from "react";

const MyComponent = ({ htmlString }) => {
  return (
    <div className="w-[50%]" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default MyComponent;
