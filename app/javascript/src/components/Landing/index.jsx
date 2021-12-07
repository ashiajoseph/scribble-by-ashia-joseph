import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import SubHeader from "./SubHeader";
import Table from "./Table";

const ArticleList = ({ filteredArticlesCount }) => {
  const [tableColumnHeader, setTableColumnHeader] = useState({
    title: true,
    categories: true,
    date: true,
    author: true,
    status: true,
  });

  return (
    <div className="w-full my-3">
      <SubHeader
        tableColumnHeader={tableColumnHeader}
        setTableColumnHeader={setTableColumnHeader}
      />
      <Typography style="h4" weight="semibold" className="pl-6 mb-10">
        {filteredArticlesCount} Articles
      </Typography>
      <Table />
    </div>
  );
};

export default ArticleList;
