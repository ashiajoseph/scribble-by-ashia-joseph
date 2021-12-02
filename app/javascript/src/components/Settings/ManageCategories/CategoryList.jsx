import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { PageLoader } from "@bigbinary/neetoui/v2";
import Sortable from "sortablejs";

import categoriesApi from "apis/categories";

import Category from "./Category";
import CategoryInput from "./Input";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      await categoriesApi.create({ category: { name: category } });
    } catch (error) {
      logger.error(error);
    } finally {
      setShowCategoryInput(false);
      fetchCategoryList();
    }
  };

  const drop = () => {};

  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();
      const { category_list } = response.data;
      setCategoryList(category_list);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const element = document.getElementById("category-list");
    Sortable.create(element, {
      animation: 300,
      handle: ".ri-drag-move-2-line",
      ghostClass: "bg-gray-100",
      onEnd: drop,
    });
    setLoading(true);
    fetchCategoryList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

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
        {categoryList.map(({ name }, index) => (
          <Category key={index} category={name} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
