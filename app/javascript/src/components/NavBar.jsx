import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
        <Typography style="h4">Scribble</Typography>
        <Link to="" className="">
          Articles
        </Link>
        <Link to="" className="">
          Settings
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default NavBar;
