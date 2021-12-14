import React, { useState, useEffect, useContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import MenuBar from "./MenuBar";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const { websiteName } = useContext(websiteContext);
  const fetchPublishedList = async () => {
    try {
      await categoriesApi.retrieve_published_article_list();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

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
