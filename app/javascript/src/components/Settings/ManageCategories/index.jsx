import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import CategoryList from "./CategoryList";

const ManageCategories = () => {
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
      <CategoryList />
    </div>
  );
};

export default ManageCategories;
