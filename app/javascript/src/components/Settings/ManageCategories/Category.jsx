import React, { useState, useRef } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import CategoryInput from "./Input";

const Category = ({ id, name, deleteCategory }) => {
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [category, setCategory] = useState(name);
  const [loading, setLoading] = useState(false);
  const categoryRef = useRef();

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

  const handleValidation = () => {
    const categoryName = category.trim();
    if (categoryName.length === 0) {
      Toastr.error(Error("Category Name can't be blank"));
      setCategory(name);
    } else handleEdit();
  };

  const handleDelete = (id, category) => {
    const toBeDeleted = window.confirm(
      `Are you sure you want to delete '${category}' ?`
    );
    if (toBeDeleted) deleteCategory(id, categoryRef);
  };

  if (loading) {
    return (
      <div className="py-3 border-t-2 border-gray-100 border-solid text-gray-400">
        <i className="ri-drag-move-2-line mr-2 neeto-ui-text-gray-500 cursor-move	"></i>
        Editing ...
      </div>
    );
  }

  return (
    <div
      id={id}
      className="flex py-3 border-t-2 border-gray-100 border-solid "
      ref={categoryRef}
    >
      <div className="flex flex-row items-center">
        <i className="ri-drag-move-2-line mr-2 neeto-ui-text-gray-500 cursor-move	"></i>
      </div>
      {!showCategoryInput && (
        <div className="flex justify-between w-full">
          <div className="w-85">
            <Typography
              style="h4"
              className="text-gray-800 font-medium pr-2 break-all"
            >
              {category}
            </Typography>
          </div>
          <div className="mr-5">
            <button
              className="focus:outline-none"
              onClick={() => handleDelete(id, category)}
            >
              <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3 hover:text-red-600 text-md"></i>
            </button>
            <button
              className="focus:outline-none"
              onClick={() => {
                setShowCategoryInput(true);
              }}
            >
              <i className="ri-pencil-line neeto-ui-text-gray-600 hover:text-black  text-md"></i>
            </button>
          </div>
        </div>
      )}
      {showCategoryInput && (
        <CategoryInput
          category={category}
          setCategory={setCategory}
          handleSubmit={handleValidation}
          width="w-1/2"
        />
      )}
    </div>
  );
};

export default Category;
