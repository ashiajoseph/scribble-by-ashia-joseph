import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";

import CategoryInput from "./Input";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleClick = () => {
    logger.info(category);
    setShowCategoryInput(false);
  };
  return (
    <div>
      {!showCategoryInput && (
        <button
          className="flex items-center text-indigo-500 font-medium text-base focus:outline-none"
          onClick={() => setShowCategoryInput(true)}
        >
          <Plus size={18} /> Add new category
        </button>
      )}
      {showCategoryInput && (
        <CategoryInput setCategory={setCategory} handleClick={handleClick} />
      )}
    </div>
  );
};

export default Categories;
