import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";

import Category from "./Category";
import CategoryInput from "./Input";

const CategoryList = () => {
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const list = ["General", "Redirections", "Manage categories"];

  const handleClick = () => {
    logger.info(category);
    setShowCategoryInput(false);
  };

  return (
    <div>
      <div className="mb-5">
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
      <div>
        {list.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
