import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import CategoryList from "./CategoryList";

const ManageCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await categoriesApi.create({ category: { name: category } });
      fetchCategoryList();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    } finally {
      setShowCategoryInput(false);
    }
  };

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
    <div className="mt-12">
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
        setCategoryList={setCategoryList}
        fetchCategoryList={fetchCategoryList}
        category={category}
        setCategory={setCategory}
        showCategoryInput={showCategoryInput}
        setShowCategoryInput={setShowCategoryInput}
        handleSubmit={handleSubmit}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default ManageCategories;
