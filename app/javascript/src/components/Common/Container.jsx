import React from "react";

import NavBar from "../NavBar";

const Container = ({ children }) => {
  return (
    <div className="h-screen">
      <NavBar />
      {children}
    </div>
  );
};

export default Container;
