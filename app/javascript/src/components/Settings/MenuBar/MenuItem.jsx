import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

//Settings MenuBar
const MenuBar = ({
  title,
  description,
  setSelectedSettingOption,
  children,
}) => {
  return (
    <div
      className="flex items-center p-2 mb-2 rounded-sm hover:bg-gray-200"
      onClick={() => setSelectedSettingOption(title)}
    >
      {children}
      <div className="ml-3">
        <Typography style="h4" className="font-medium		">
          {title}
        </Typography>
        <Typography style="h6" className="neeto-ui-text-gray-500 font-normal">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default MenuBar;
