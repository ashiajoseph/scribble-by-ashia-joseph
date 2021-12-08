import React, { useState, useEffect, useMemo } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";
import { useTable, useFilters } from "react-table";

import categoriesApi from "apis/categories";

import Container from "./Common/Container";
import Menu from "./Landing/Menu";
import SubHeader from "./Landing/SubHeader";
import Table from "./Landing/Table";

import articlesApi from "../apis/articles";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [articleList, setArticleList] = useState(["a"]);

  const [displayedCount, setDisplayedCount] = useState({
    draft: 0,
    published: 0,
  });
  const [filteredArticlesCount, setFilteredArticlesCount] = useState();
  const [tableColumnHeader, setTableColumnHeader] = useState({
    title: true,
    date: true,
    author: true,
    category: true,
    status: true,
  });
  const [articleToBeDeleted, setArticleToBeDeleted] = useState({
    id: null,
    status: "",
    category: "",
  });

  const fetchCategoryList = async () => {
    try {
      const response = await categoriesApi.list();
      const {
        total_draft_count,
        total_published_count,
        category_list,
        article_list_with_categories,
        article_list_without_categories,
      } = response.data;
      setFilteredArticlesCount(total_draft_count + total_published_count);

      setDisplayedCount({
        total_draft_count: total_draft_count,
        total_published_count: total_published_count,
        draft: total_draft_count,
        published: total_published_count,
      });
      setCategoryList(category_list);
      setArticleList(
        [
          ...article_list_with_categories,
          article_list_without_categories,
        ].flat()
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyStyle = column => {
    let style = "";
    const cols = ["author", "category", "status"];
    if (column === "title") style = "text-indigo-500 font-medium";
    else if (cols.includes(column)) style = "neeto-ui-text-gray-600";

    return style;
  };

  const deleteArticle = async article => {
    setLoading(true);
    setArticleToBeDeleted(article);
    try {
      await articlesApi.destroy(article.id);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = article => {
    const toBeDeleted = window.confirm(
      `Are you sure you want to delete article '${article.title}' ?`
    );
    if (toBeDeleted) deleteArticle(article);
  };

  const filteredColumns = Object.keys(tableColumnHeader).filter(
    column => tableColumnHeader[column]
  );
  const columnHeader = filteredColumns.map(column => {
    return {
      id: column,
      Header: column.toUpperCase(),
      accessor: column,
      Cell: ({ row }) => (
        <span className={applyStyle(column)}>{row.values[column]}</span>
      ),
    };
  });

  if (filteredColumns.length !== 0) {
    columnHeader.push(
      {
        id: "delete",
        width: 35,
        Cell: ({ row }) => (
          <button
            className="focus:outline-none"
            onClick={() => {
              handleDelete(row.original);
            }}
          >
            <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3 hover:text-red-600 text-md"></i>
          </button>
        ),
      },
      {
        id: "edit",
        width: 40,
        Cell: ({ row }) => (
          <Link to={`/articles/${row.original.id}/edit`}>
            <i className="ri-pencil-line neeto-ui-text-gray-600 hover:text-black  text-md"></i>
          </Link>
        ),
      }
    );
  }
  const data = useMemo(() => articleList, [articleList]);
  const columns = useMemo(() => columnHeader, [tableColumnHeader]);
  const tableInstance = useTable({ columns: columns, data: data }, useFilters);

  const filterListAndModifyCount = () => {
    const filteredArticleList = articleList.filter(
      ({ id }) => id !== articleToBeDeleted.id
    );

    const modifiedCategoryList = categoryList.map(category => {
      const newCategoryObject = { ...category };
      if (category.id === articleToBeDeleted.category_id) {
        newCategoryObject[articleToBeDeleted.status] =
          articleToBeDeleted.status === "draft"
            ? category["draft"] - 1
            : category["published"] - 1;
      }

      return newCategoryObject;
    });
    const articleStatus = articleToBeDeleted.status;
    const statusCount = displayedCount[articleStatus] - 1;
    const totalArticlesCountOfStatus =
      displayedCount[`total_${articleStatus}_count`] - 1;
    setDisplayedCount(prev => {
      return {
        ...prev,
        [`total_${articleStatus}_count`]: totalArticlesCountOfStatus,
        [`${articleStatus}`]: statusCount,
      };
    });

    setArticleList(filteredArticleList);
    setCategoryList(modifiedCategoryList);
  };

  useEffect(() => {
    if (articleToBeDeleted.id !== null) filterListAndModifyCount();
  }, [articleToBeDeleted]);

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
          displayedCount={displayedCount}
          setDisplayedCount={setDisplayedCount}
          setFilteredArticlesCount={setFilteredArticlesCount}
          tableInstance={tableInstance}
        />
        <div className="w-full my-3">
          <SubHeader
            tableColumnHeader={tableColumnHeader}
            setTableColumnHeader={setTableColumnHeader}
            tableInstance={tableInstance}
          />
          <Typography style="h4" weight="semibold" className="pl-6 mb-10">
            {filteredArticlesCount} Articles
          </Typography>
          <Table tableInstance={tableInstance} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
