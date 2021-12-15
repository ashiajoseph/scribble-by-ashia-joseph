import React from "react";

import Error from "images/error.png";

const NotFound = () => {
  return (
    <div className="w-1/2 mx-auto mt-40  text-center">
      <img src={Error} className="mx-auto w-1/3 mb-5" />
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
