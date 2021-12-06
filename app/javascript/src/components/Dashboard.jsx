import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import categoriesApi from "apis/categories";

import Container from "./Common/Container";
import Menu from "./Landing/Menu";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

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
      <Menu categoryList={categoryList} setCategoryList={setCategoryList} />
    </Container>
  );
};

export default Dashboard;
