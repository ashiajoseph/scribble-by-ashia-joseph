import React from "react";

import Category from "./Category";

const MenuBar = ({ data }) => {
  return (
    <div className="flex flex-col w-1/4 px-6 pt-8 border-r-2 border-nav-menubar">
      {data.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
};

export default MenuBar;
