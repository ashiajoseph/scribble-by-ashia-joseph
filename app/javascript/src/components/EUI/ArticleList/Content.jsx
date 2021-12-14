import React, { useContext } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import { articleContext } from ".";

const Content = () => {
  const { selectedArticle } = useContext(articleContext);

  return (
    <div>
      <h1 className="text-5xl text-bold break-all">{selectedArticle.title}</h1>
      <div className="flex flex-row mt-2 items-center mb-8">
        <Typography
          style="h5"
          className="py-1 px-3 mr-5 rounded	font-medium text-blue-800 bg-blue-100 break-all"
        >
          {selectedArticle.category}
        </Typography>
        <Typography style="h4" className="font-medium text-gray-500">
          {selectedArticle.date}
        </Typography>
      </div>
      <Typography style="body1" weight="normal" className="whitespace-pre-line">
        {selectedArticle.content}
      </Typography>
    </div>
  );
};

export default Content;
