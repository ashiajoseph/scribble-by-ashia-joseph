import React, { useContext } from "react";

import MenuBar from "./MenuBar";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const ArticleList = () => {
  const { websiteName } = useContext(websiteContext);

  return (
    <div className="h-screen">
      <NavBar name={websiteName} />
      <div className="flex h-full">
        <MenuBar />
      </div>
    </div>
  );
};

export default ArticleList;
