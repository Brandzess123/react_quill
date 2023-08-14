import React from "react";
const MyComponent = ({ htmlString }) => {
  return (
    <div className="bg-red-600 test">
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

export default MyComponent;
