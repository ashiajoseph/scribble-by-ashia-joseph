import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import CategoryInput from "./Input";

const Category = ({ id, name, deleteCategory }) => {
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [category, setCategory] = useState(name);
  const [loading, setLoading] = useState(false);
  const handleEdit = async () => {
    setLoading(true);
    try {
      await categoriesApi.update({
        id: id,
        payload: { name: category },
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setShowCategoryInput(false);
      setLoading(false);
    }
  };

  const handleDelete = (id, category) => {
    const toBeDeleted = window.confirm(
      `Are you sure you want to delete ${category} ?`
    );
    if (toBeDeleted) deleteCategory(id);
  };

  if (loading) {
    return (
      <div
        id={id}
        className="py-3 border-t-2 border-gray-100 border-solid text-gray-400"
      >
        <i className="ri-drag-move-2-line mr-2 neeto-ui-text-gray-500 cursor-move	"></i>{" "}
        Loading ...
      </div>
    );
  }

  return (
    <div id={id} className="flex  py-3 border-t-2 border-gray-100 border-solid	">
      <div className="flex flex-row items-center">
        <i className="ri-drag-move-2-line mr-2 neeto-ui-text-gray-500 cursor-move	"></i>
      </div>
      {!showCategoryInput && (
        <div className="flex justify-between w-full">
          <div>
            <Typography style="h4" className="text-gray-800 font-medium">
              {category}
            </Typography>
          </div>
          <div className="mr-5">
            <button
              className="focus:outline-none"
              onClick={() => handleDelete(id, category)}
            >
              <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3 hover:text-red-600"></i>
            </button>
            <button
              className="focus:outline-none"
              onClick={() => {
                setShowCategoryInput(true);
              }}
            >
              <i className="ri-pencil-line neeto-ui-text-gray-600 hover:text-black"></i>
            </button>
          </div>
        </div>
      )}
      {showCategoryInput && (
        <CategoryInput
          category={category}
          setCategory={setCategory}
          handleSubmit={handleEdit}
        />
      )}
    </div>
  );
};

export default Category;
