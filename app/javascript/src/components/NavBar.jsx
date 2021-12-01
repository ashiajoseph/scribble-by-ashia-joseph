import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const articlesTextColor =
    pathname === "/" ? "text-indigo-500" : "text-gray-400";
  const settingsTextColor =
    pathname === "/settings" ? "text-indigo-500" : "text-gray-400";
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b-2 border-nav-bottom">
      <div className="flex items-center font-semibold	">
        <Typography style="h4">Scribble</Typography>
        <Link to="/" className={`ml-6 ${articlesTextColor}`}>
          Articles
        </Link>
        <Link to="/settings" className={`ml-6 ${settingsTextColor}`}>
          Settings
        </Link>
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
