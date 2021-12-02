import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Category = ({ category }) => {
  return (
    <div className="flex justify-between">
      <Typography style="h4" className="text-gray-800 font-medium">
        {category}
      </Typography>
      <div></div>
    </div>
  );
};

export default Category;
