import React, { useState, useEffect, useContext, createContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import categoriesApi from "apis/categories";

import Content from "./Content.jsx";
import MenuBar from "./MenuBar/index.jsx";

import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const articleContext = createContext();

const ArticleList = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [selectedCatgeory, setSelectedCategory] = useState(0);
  const { slug } = useParams();
  const { websiteName } = useContext(websiteContext);
  const fetchPublishedList = async () => {
    try {
      const response = await categoriesApi.retrieve_published_article_list();
      const { list } = response.data;
      setCategoryDetails(list);
      const urlId = slug ? slug : list[0].article_list[0].slug;

      const filteredArticle = list
        .map(({ article_list }) => article_list)
        .flat()
        .filter(({ slug }) => slug === urlId);
      setSelectedArticle({
        slug: filteredArticle[0].slug,
        category: filteredArticle[0].category,
        title: filteredArticle[0].title,
        content: filteredArticle[0].content,
        date: filteredArticle[0].date,
      });
      setSelectedCategory(filteredArticle[0].category_id);
      history.push(`/public/articles/${urlId}`);
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
    <articleContext.Provider
      value={{ selectedArticle, setSelectedArticle, selectedCatgeory }}
    >
      <div className="h-screen">
        <NavBar name={websiteName} />
        <div className="flex h-full">
          {categoryDetails.length !== 0 && (
            <>
              <MenuBar data={categoryDetails} />
              <div className="w-68 mx-auto mt-10">
                <Content />
              </div>
            </>
          )}
          {categoryDetails.length === 0 && (
            <div className="mx-auto mt-64 text-3xl">No Articles Published</div>
          )}
        </div>
      </div>
    </articleContext.Provider>
  );
};

export default ArticleList;
export { articleContext };
