import React from "react";

import { Settings, Seo, Repeat } from "@bigbinary/neeto-icons";

import MenuItem from "./MenuItem";

const MenuBar = () => {
  return (
    <div className="flex flex-col w-1/4 px-5 pt-8 border-r-2 border-nav-menubar h-full">
      <MenuItem
        title="General"
        description="Page Title, Brand Name&Meta Description"
        link="/settings"
      >
        <Settings />
      </MenuItem>
      <MenuItem
        title="Redirections"
        description="Create & configure redirection rules"
        link="/settings/redirections"
      >
        <Repeat />
      </MenuItem>
      <MenuItem
        title="Manage categories"
        description="Edit and Reorder KB Structure"
        link="/settings/categories"
      >
        <Seo />
      </MenuItem>
    </div>
  );
};

export default MenuBar;
