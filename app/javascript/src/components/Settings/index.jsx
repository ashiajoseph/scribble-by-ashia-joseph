import React, { useState } from "react";

import ManageCategories from "./ManageCategories.jsx";
import MenuBar from "./MenuBar/index.jsx";

import Container from "../Common/Container";

const Settings = () => {
  const [selectedSettingOption, setSelectedSettingOption] =
    useState("Manage categories");

  return (
    <Container>
      <div className="flex h-full">
        <MenuBar
          selectedSettingOption={selectedSettingOption}
          setSelectedSettingOption={setSelectedSettingOption}
        />
        <div className="w-2/5 mx-auto">
          {selectedSettingOption === "Manage categories" && (
            <ManageCategories />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Settings;
