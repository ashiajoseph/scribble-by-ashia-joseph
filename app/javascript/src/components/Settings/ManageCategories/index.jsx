import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import CategoryList from "./CategoryList";

const ManageCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

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
        fetchCategoryList={fetchCategoryList}
      />
    </div>
  );
};

export default ManageCategories;
