import React, { useState } from "react";

import { Settings, Seo, Repeat } from "@bigbinary/neeto-icons";

import MenuItem from "./MenuItem";

const MenuBar = () => {
  const [selectedSettingOption, setSelectedSettingOption] =
    useState("Manage categories");
  logger.info(selectedSettingOption);
  return (
    <div className="flex flex-col w-1/4 px-5 pt-8 border-r-2 border-nav-menubar h-screen">
      <MenuItem
        title="General"
        description="Page Title, Brand Name&Meta Description"
        setSelectedSettingOption={setSelectedSettingOption}
      >
        <Settings />
      </MenuItem>
      <MenuItem
        title="Redirections"
        description="Create & configure redirection rules"
        setSelectedSettingOption={setSelectedSettingOption}
      >
        <Repeat />
      </MenuItem>
      <MenuItem
        title="Manage categories"
        description="Edit and Reorder KB Structure"
        setSelectedSettingOption={setSelectedSettingOption}
      >
        <Seo />
      </MenuItem>
    </div>
  );
};

export default MenuBar;
