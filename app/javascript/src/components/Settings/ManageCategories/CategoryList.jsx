import React, { useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import Sortable from "sortablejs";

import categoriesApi from "apis/categories";

import Category from "./Category";
import CategoryInput from "./Input";

const CategoryList = ({
  categoryList,
  category,
  setCategory,
  showCategoryInput,
  setShowCategoryInput,
  handleSubmit,
  handleDrop,
}) => {
  const deleteCategory = async (idToBeDeleted, categoryRef) => {
    try {
      categoryRef.current.style.display = "none";
      await categoriesApi.destroy(idToBeDeleted);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    const element = document.getElementById("category-list");
    Sortable.create(element, {
      animation: 280,
      handle: ".ri-drag-move-2-line",
      ghostClass: "bg-gray-100",
      onEnd: handleDrop,
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
          <CategoryInput
            category={category}
            setCategory={setCategory}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div id="category-list" className="overflow-y-scroll">
        {categoryList.map(({ id, name }, index) => (
          <Category
            key={index}
            id={id}
            name={name}
            deleteCategory={deleteCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
