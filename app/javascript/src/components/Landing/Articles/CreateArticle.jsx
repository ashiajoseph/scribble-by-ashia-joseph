import React, { useState, useEffect } from "react";

import { PageLoader, Toastr } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import categoriesApi from "apis/categories";

import ArticleForm from "./Form/ArticleForm";

import Container from "../../Common/Container";

const CreateArticle = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    status: "draft",
  });

  const handleSubmit = () => {};

  const handleValidation = e => {
    e.preventDefault();
    const emptyFieldPresent = Object.keys(formData).some(field =>
      either(isEmpty, isNil)(formData[field])
    );
    if (emptyFieldPresent) Toastr.error(Error("Please fill all the Fields"));
    else handleSubmit();
  };

  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();
      const { category_list } = response.data;
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
