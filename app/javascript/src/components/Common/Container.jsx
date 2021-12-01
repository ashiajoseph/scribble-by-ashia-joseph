import React from "react";

import NavBar from "../NavBar";

const Container = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Container;
