import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import Sortable from "sortablejs";

import categoriesApi from "apis/categories";

import Category from "./Category";
import CategoryInput from "./Input";

const CategoryList = ({ categoryList, fetchCategoryList }) => {
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleClick = async () => {
    try {
      await categoriesApi.create({ category: { name: category } });
    } catch (error) {
      logger.error(error);
    } finally {
      setShowCategoryInput(false);
      fetchCategoryList();
    }
  };

  const drop = e => {
    e;
  };

  useEffect(() => {
    const element = document.getElementById("category-list");
    Sortable.create(element, {
      animation: 350,
      handle: ".ri-drag-move-2-line",
      ghostClass: "bg-gray-100",
      onEnd: drop,
    });
  }, []);

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
      <div id="category-list">
        {categoryList.map(({ id, name }, index) => (
          <Category key={index} id={id} category={name} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
