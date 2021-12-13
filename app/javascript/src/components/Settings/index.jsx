import React from "react";

import ManageCategories from "./ManageCategories/index.jsx";
import MenuBar from "./MenuBar/index.jsx";

import Container from "../Common/Container";

const Settings = () => {
  return (
    <Container>
      <div className="flex h-full">
        <MenuBar />
        <div className="w-45 mx-auto">
          <ManageCategories />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
