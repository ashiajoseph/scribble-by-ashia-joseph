import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import SubHeader from "./SubHeader";
import Table from "./Table";

const ArticleList = ({ filteredArticlesCount, articleList }) => {
  const [tableColumnHeader, setTableColumnHeader] = useState({
    title: true,
    date: true,
    author: true,
    category: true,
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
      <Table tableColumnHeader={tableColumnHeader} articleList={articleList} />
    </div>
  );
};

export default ArticleList;
