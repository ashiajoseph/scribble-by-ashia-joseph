import React, { useState, useEffect } from "react";

import { Typography, PageLoader, Toastr } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import CategoryList from "./CategoryList";

const ManageCategories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleDrop = async e => {
    const droppedElementId = parseInt(e.item.id);
    const newPosition = e.newIndex + 1;
    try {
      await categoriesApi.reorder_position({
        id: droppedElementId,
        payload: { position: newPosition },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await categoriesApi.create({
        category: { name: category },
      });
      const { new_category } = response.data;
      setCategoryList(prevList => [...prevList, new_category]);
      setCategory("");
    } catch (error) {
      logger.error(error);
    } finally {
      setShowCategoryInput(false);
    }
  };

  const handleValidation = () => {
    const categoryName = category.trim();
    if (categoryName.length === 0) {
      Toastr.error(Error("Category Name can't be blank"));
      setCategory("");
    } else handleSubmit();
  };

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
    setLoading(true);
    fetchCategoryList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4" id="category-list">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-12 mb-6">
      <Typography
        style="h3"
        className="neeto-ui-text-gray-800 font-semibold mb-1"
      >
        Manage Categories
      </Typography>
      <Typography
        style="h4"
        className="neeto-ui-text-gray-600 font-normal mb-10"
      >
        Create and configure the categories inside your scribble.
      </Typography>
      <CategoryList
        categoryList={categoryList}
        fetchCategoryList={fetchCategoryList}
        category={category}
        setCategory={setCategory}
        showCategoryInput={showCategoryInput}
        setShowCategoryInput={setShowCategoryInput}
        handleValidation={handleValidation}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default ManageCategories;
