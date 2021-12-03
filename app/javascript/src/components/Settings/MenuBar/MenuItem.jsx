import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

//Settings MenuBar
const MenuBar = ({
  title,
  description,
  selectedSettingOption,
  setSelectedSettingOption,
  children,
}) => {
  const selectedBackgroundStyle =
    selectedSettingOption === title ? "bg-indigo-50" : null;
  const selectedIconColor =
    selectedSettingOption === title ? "text-black" : "neeto-ui-text-gray-500";
  return (
    <div
      className={`flex items-center p-2 mb-2 rounded-sm hover:bg-gray-200 ${selectedBackgroundStyle}`}
      onClick={() => setSelectedSettingOption(title)}
    >
      <div className={selectedIconColor}>{children}</div>
      <div className="ml-3">
        <Typography style="h4" className="font-medium		">
          {title}
        </Typography>
        <Typography style="h6" className={` font-normal ${selectedIconColor}`}>
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default MenuBar;
