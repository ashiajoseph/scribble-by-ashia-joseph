import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Category = ({ category }) => {
  const [displayArticles, setDisplayArticles] = useState(false);

  const handleClick = () => {
    setDisplayArticles(prev => !prev);
  };
  return (
    <div className="my-2 text-gray-600 p-1" onClick={handleClick}>
      <div className="flex items-center cursor-pointer">
        {displayArticles ? (
          <i className="ri-arrow-down-s-line text-xl mr-2"></i>
        ) : (
          <i className="ri-arrow-right-s-line text-xl mr-2"></i>
        )}
        <Typography style="h4" className="font-semibold break-words">
          {category.name}
        </Typography>
      </div>
      {displayArticles && <div></div>}
    </div>
  );
};

export default Category;
