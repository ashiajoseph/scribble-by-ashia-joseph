import React, { useState, useEffect, useContext } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import Article from "./Article";

import { articleContext } from "..";

const Category = ({ category }) => {
  const [displayArticles, setDisplayArticles] = useState(false);
  const { selectedCatgeory } = useContext(articleContext);
  const handleClick = () => {
    setDisplayArticles(prev => !prev);
  };

  useEffect(() => {
    if (category.id === selectedCatgeory) setDisplayArticles(true);
  }, []);

  return (
    <div className="mt-1 text-gray-600 p-1">
      <div
        className="flex items-center cursor-pointer mb-2 break-all"
        onClick={handleClick}
      >
        {displayArticles ? (
          <i className="ri-arrow-down-s-line text-xl mr-2"></i>
        ) : (
          <i className="ri-arrow-right-s-line text-xl mr-2"></i>
        )}
        <Typography
          style="h4"
          className="font-semibold break-words tracking-wide"
        >
          {category.name}
        </Typography>
      </div>
      {displayArticles &&
        category.article_list.map((article, index) => (
          <Article key={index} data={article} />
        ))}
    </div>
  );
};

export default Category;
