import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Article = ({ data }) => {
  return (
    <div className="ml-8">
      <Typography
        style="h5"
        className="font-medium break-words text-gray-500 my-1 "
      >
        {data.title}
      </Typography>
    </div>
  );
};

export default Article;
