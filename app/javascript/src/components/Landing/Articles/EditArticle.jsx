import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticleForm from "./Form/ArticleForm";

import Container from "../../Common/Container";

const EditArticle = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({});
  const { articleId } = useParams();

  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();
      const { category_list } = response.data;
      setCategoryList(category_list);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await articlesApi.show(articleId);
      const { article } = response.data;

      setFormData(article);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
    fetchArticle();
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
      <div className="w-1/2 mx-auto my-10">
        <ArticleForm
          categoryList={categoryList}
          formData={formData}
          setFormData={setFormData}
          defaultValue={{
            label: formData.category,
            value: formData.category_id,
          }}
          // handleValidation={handleValidation}
        />
      </div>
    </Container>
  );
};

export default EditArticle;
