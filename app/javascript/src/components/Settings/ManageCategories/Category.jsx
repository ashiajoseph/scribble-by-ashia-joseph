import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Category = ({ category }) => {
  return (
    <div className="flex justify-between py-3 border-t-2 border-gray-100 border-solid	">
      <div className="flex flex-row items-center">
        <i className="ri-drag-move-2-line mr-2 neeto-ui-text-gray-500"></i>
        <Typography style="h4" className="text-gray-800 font-medium">
          {category}
        </Typography>
      </div>
      <div className="mr-5">
        <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3"></i>
        <i className="ri-pencil-line neeto-ui-text-gray-600"></i>
      </div>
    </div>
  );
};

export default Category;
