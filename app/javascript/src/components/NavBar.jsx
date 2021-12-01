import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b-2 border-nav-bottom">
      <div className="flex items-center font-semibold	">
        <Typography style="h4">Scribble</Typography>
        <NavLink
          to="/"
          exact
          className={isActive =>
            (isActive ? "text-indigo-500" : "text-gray-400") + " ml-6"
          }
        >
          Articles
        </NavLink>
        <NavLink
          to="/settings"
          className={isActive =>
            (isActive ? "text-indigo-500" : "text-gray-400") + " ml-6"
          }
        >
          Settings
        </NavLink>
      </div>
      <div>
        <Button
          onClick={() => {}}
          size="large"
          label="Preview"
          style="secondary"
          icon={ExternalLink}
        />
      </div>
    </div>
  );
};

export default NavBar;
