import React from "react";

import Container from "../../Common/Container";
import MenuBar from "../MenuBar";

const General = () => {
  return (
    <Container>
      <div className="flex h-full">
        <MenuBar />
        <div className="w-45 mx-auto mt-12 mb-6"></div>
      </div>
    </Container>
  );
};

export default General;
