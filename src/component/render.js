import React from "react";
const MyComponent = ({ htmlString }) => {
  return (
    <div className="test" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default MyComponent;
