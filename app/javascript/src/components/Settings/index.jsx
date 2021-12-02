import React, { useState } from "react";

import MenuBar from "./MenuBar/index.jsx";

import Container from "../Common/Container";

const Settings = () => {
  const [selectedSettingOption, setSelectedSettingOption] =
    useState("Manage categories");

  return (
    <Container>
      <div className="flex">
        <MenuBar
          selectedSettingOption={selectedSettingOption}
          setSelectedSettingOption={setSelectedSettingOption}
        />
      </div>
    </Container>
  );
};

export default Settings;
