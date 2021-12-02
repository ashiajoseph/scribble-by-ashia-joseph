import React from "react";

import { Plus } from "@bigbinary/neeto-icons";

const Categories = () => {
  const handleClick = () => {
    //logger.info("clicked")
  };
  return (
    <div>
      <button
        className="flex items-center text-indigo-500 font-medium text-base focus:outline-none"
        onClick={handleClick}
      >
        <Plus size={18} /> Add new category
      </button>
    </div>
  );
};

export default Categories;
