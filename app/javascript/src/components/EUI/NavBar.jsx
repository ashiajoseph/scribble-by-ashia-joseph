import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const NavBar = ({ name }) => {
  return (
    <div className="sticky top-0 flex justify-center items-center px-6 py-4 border-b-2 border-nav-menubar bg-white h-1/6 z-10">
      <Typography style="h4" weight="semibold">
        {name}
      </Typography>
    </div>
  );
};

export default NavBar;
