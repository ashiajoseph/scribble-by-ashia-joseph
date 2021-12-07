import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import Container from "./Common/Container";
import ArticleList from "./Landing/ArticleList";
import Menu from "./Landing/Menu";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [articlesCount, setArticlesCount] = useState({
    draft: 0,
    published: 0,
  });
  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();

      const { draft_count, published_count, category_list } = response.data;
      setArticlesCount({ draft: draft_count, published: published_count });
      setCategoryList(category_list);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-row">
        <Menu
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          articlesCount={articlesCount}
        />
        <ArticleList tableColumnHeader />
      </div>
    </Container>
  );
};

export default Dashboard;
