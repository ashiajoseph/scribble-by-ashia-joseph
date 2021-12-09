import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useLocation, useHistory } from "react-router-dom";

//Settings MenuBar
const MenuBar = ({ title, description, link, children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const history = useHistory();
  const selectedBackgroundStyle = link === pathname ? "bg-indigo-50" : null;
  const selectedIconColor =
    link === pathname ? "text-black" : "neeto-ui-text-gray-500";
  return (
    <div
      className={`flex items-center p-2 mb-2 rounded-sm hover:bg-gray-200 pointer ${selectedBackgroundStyle}`}
      onClick={() => history.push(link)}
    >
      <div className={selectedIconColor}>{children}</div>
      <div className="ml-3">
        <Typography style="h4" className="font-medium">
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
