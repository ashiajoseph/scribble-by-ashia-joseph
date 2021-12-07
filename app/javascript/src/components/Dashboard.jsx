import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import Container from "./Common/Container";
import ArticleList from "./Landing";
import Menu from "./Landing/Menu";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [totalArticlesCount, setTotalArticlesCount] = useState({
    draft: 0,
    published: 0,
  });
  const [displayedCount, setDisplayedCount] = useState({
    draft: 0,
    published: 0,
  });
  const [filteredArticlesCount, setFilteredArticlesCount] = useState();

  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();
      const {
        total_draft_count,
        total_published_count,
        category_list,
        article_list,
      } = response.data;
      setFilteredArticlesCount(total_draft_count + total_published_count);
      setTotalArticlesCount({
        draft: total_draft_count,
        published: total_published_count,
      });
      setDisplayedCount({
        draft: total_draft_count,
        published: total_published_count,
      });
      setCategoryList(category_list);
      setArticleList(article_list.flat());
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
          totalArticlesCount={totalArticlesCount}
          displayedCount={displayedCount}
          setDisplayedCount={setDisplayedCount}
          setFilteredArticlesCount={setFilteredArticlesCount}
        />
        <ArticleList
          filteredArticlesCount={filteredArticlesCount}
          articleList={articleList}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
