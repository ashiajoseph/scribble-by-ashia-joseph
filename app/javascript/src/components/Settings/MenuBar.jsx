import React from "react";

import { Settings, Seo, Repeat } from "@bigbinary/neeto-icons";

const MenuBar = () => {
  return (
    <div className="flex flex-col w-1/4 px-5 border-r-2 border-nav-menubar h-screen">
      <div>
        <Settings size={28} />
        <div></div>
      </div>
      <div>
        <Repeat size={28} />
        <div></div>
      </div>
      <div>
        <Seo size={28} />
        <div></div>
      </div>
    </div>
  );
};

export default MenuBar;
