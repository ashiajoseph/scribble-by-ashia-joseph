import React, { useState, useEffect, useContext, createContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import Content from "./Content.jsx";
import MenuBar from "./MenuBar/index.jsx";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const articleContext = createContext();

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const { websiteName } = useContext(websiteContext);
  const fetchPublishedList = async () => {
    try {
      const response = await categoriesApi.retrieve_published_article_list();
      const { list } = response.data;
      setCategoryDetails(list);
      setSelectedArticle({
        id: list[0].article_list[0].id,
        category: list[0].name,
        title: list[0].article_list[0].title,
        content: list[0].article_list[0].content,
        date: list[0].article_list[0].date,
      });
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
    <articleContext.Provider value={{ selectedArticle, setSelectedArticle }}>
      <div className="h-screen">
        <NavBar name={websiteName} />
        <div className="flex h-full">
          <MenuBar data={categoryDetails} />
          <div className="w-68 mx-auto mt-10">
            <Content />
          </div>
        </div>
      </div>
    </articleContext.Provider>
  );
};

export default ArticleList;
export { articleContext };
