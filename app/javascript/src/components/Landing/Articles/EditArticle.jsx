import React, { useState, useEffect } from "react";

import { PageLoader, Toastr } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticleForm from "./Form/ArticleForm";

import Container from "../../Common/Container";

const EditArticle = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({});
  const [defaultValue, setDefaultValue] = useState({});
  const { articleId } = useParams();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await articlesApi.update({
        id: articleId,
        payload: { article: formData },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleValidation = e => {
    e.preventDefault();

    const emptyFieldPresent = Object.keys(formData).some(field => {
      const value =
        typeof formData[field] === "string"
          ? formData[field].trim()
          : formData[field];
      return either(isEmpty, isNil)(value);
    });
    if (emptyFieldPresent) {
      Toastr.error(Error("Please do not leave any fields blank"));
    } else handleSubmit();
  };

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
      const { article, category } = response.data;
      setDefaultValue({ label: category, value: article.category_id });
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
          defaultValue={defaultValue}
          handleValidation={handleValidation}
        />
      </div>
    </Container>
  );
};

export default EditArticle;
