import React, { useState, useEffect, useContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import MenuBar from "./MenuBar/index.jsx";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const { websiteName } = useContext(websiteContext);
  const fetchPublishedList = async () => {
    try {
      const response = await categoriesApi.retrieve_published_article_list();
      const { list } = response.data;
      setCategoryDetails(list);
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
        <MenuBar data={categoryDetails} />
      </div>
    </div>
  );
};

export default ArticleList;
