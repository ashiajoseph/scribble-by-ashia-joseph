import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="flex ">
        <Typography style="h4">Scribble</Typography>
        <Link to="" className="">
          Articles
        </Link>
        <Link to="" className="">
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
