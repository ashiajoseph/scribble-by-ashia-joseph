import React, { useContext } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import { articleContext } from "..";

const Article = ({ data, category }) => {
  const { selectedArticle, setSelectedArticle } = useContext(articleContext);
  const handleClick = () => {
    setSelectedArticle({
      id: data.id,
      category,
      title: data.title,
      content: data.content,
      date: data.date,
    });
  };
  const textColor =
    selectedArticle.id === data.id ? "text-indigo-500" : " text-gray-500 ";
  return (
    <div className="ml-8 cursor-pointer" onClick={handleClick}>
      <Typography
        style="h5"
        className={`font-medium break-words text-gray-500 my-1 ${textColor}`}
      >
        {data.title}
      </Typography>
    </div>
  );
};

export default Article;
