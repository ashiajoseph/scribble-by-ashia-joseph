import React, { useState } from "react";

import SubHeader from "./SubHeader";

const ArticleList = () => {
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
    </div>
  );
};

export default ArticleList;
