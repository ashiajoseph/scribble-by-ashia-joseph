import React, { useState, useEffect } from "react";

import { PageLoader, Toastr } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticleForm from "./Form/ArticleForm";

import Container from "../../Common/Container";

const CreateArticle = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await articlesApi.create({
        article: formData,
        category_id: formData["category_id"],
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
      if (category_list.length === 0) {
        Toastr.error(Error("Please create a category first"));
      }
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
      <div className="w-1/2 mx-auto my-10">
        <ArticleForm
          categoryList={categoryList}
          formData={formData}
          setFormData={setFormData}
          handleValidation={handleValidation}
        />
      </div>
    </Container>
  );
};

export default CreateArticle;
