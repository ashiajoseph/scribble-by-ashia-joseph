import React from "react";

import NavBar from "../NavBar";

const Container = ({ overflow = "", children }) => {
  return (
    <div className={`h-screen ${overflow}`}>
      <NavBar />
      {children}
    </div>
  );
};

export default Container;
