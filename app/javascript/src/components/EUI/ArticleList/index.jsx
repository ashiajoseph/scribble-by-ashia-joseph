import React, { useContext } from "react";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const ArticleList = () => {
  const { websiteName } = useContext(websiteContext);

  return (
    <>
      <NavBar name={websiteName} />
    </>
  );
};

export default ArticleList;
