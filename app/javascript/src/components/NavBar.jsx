import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/public/login");
  };
  return (
    <div className="sticky top-0 flex justify-between items-center px-6 py-4 border-b-2 border-nav-menubar bg-white h-1/6 z-10">
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
          to="/settings/categories"
          className={isActive =>
            (isActive ? "text-indigo-500" : "text-gray-400") + " ml-6"
          }
        >
          Settings
        </NavLink>
      </div>
      <div>
        <Button
          size="large"
          label="Preview"
          style="secondary"
          icon={ExternalLink}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default NavBar;
