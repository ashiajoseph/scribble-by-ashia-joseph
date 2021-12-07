import React, { useState } from "react";

import { Plus, Search, Close } from "@bigbinary/neeto-icons";
import { Typography, Toastr } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import categoriesApi from "apis/categories";

import CategoryInput from "../Settings/ManageCategories/Input";

const Menu = ({
  categoryList,
  setCategoryList,
  totalArticlesCount,
  displayedCount,
  setDisplayedCount,
  setFilteredArticlesCount,
  tableInstance,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [addCategory, setAddCategory] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { setFilter } = tableInstance;

  const handleSubmit = async () => {
    try {
      const response = await categoriesApi.create({
        category: { name: category },
      });
      const { new_category } = response.data;
      setCategoryList(prevList => [...prevList, new_category]);
      setCategory("");
      setAddCategory(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleValidation = () => {
    const categoryName = category.trim();
    if (categoryName.length === 0) {
      Toastr.error(Error("Category Name can't be blank"));
      setCategory("");
    } else handleSubmit();
  };

  const handleCategoryClick = (categoryName, draftCount, publishedCount) => {
    const name = categoryName === selectedCategory ? "" : categoryName;
    const articlesCount =
      categoryName === selectedCategory
        ? totalArticlesCount
        : { draft: draftCount, published: publishedCount };
    const currentCount =
      selectedStatus === "All"
        ? articlesCount.draft + articlesCount.published
        : selectedStatus === "Draft"
        ? articlesCount.draft
        : articlesCount.published;
    setFilter("category", name);
    setSelectedCategory(name);
    setDisplayedCount(articlesCount);
    setFilteredArticlesCount(currentCount);
  };

  const handleStatusClick = (status, count) => {
    const new_status = status === selectedStatus ? "All" : status;
    const articlesCount =
      new_status === "All"
        ? totalArticlesCount.draft + totalArticlesCount.published
        : count;
    const filterStatus = new_status === "All" ? "" : new_status;
    setFilter("status", filterStatus);
    setSelectedStatus(new_status);
    setFilteredArticlesCount(articlesCount);
  };

  const showCategoryInput = addCategory
    ? {
        icon: Close,
        onClick: () => setAddCategory(!addCategory),
      }
    : {
        icon: Plus,
        onClick: () => setAddCategory(!addCategory),
      };

  return (
    <MenuBar showMenu={true} title="Articles">
      <MenuBar.Block
        label="All"
        count={displayedCount.draft + displayedCount.published}
        active={selectedStatus === "All"}
        onClick={() =>
          handleStatusClick(
            "All",
            displayedCount.draft + displayedCount.published
          )
        }
      />
      <MenuBar.Block
        label="Draft"
        count={displayedCount.draft}
        active={selectedStatus === "Draft"}
        onClick={() => handleStatusClick("Draft", displayedCount.draft)}
      />
      <MenuBar.Block
        label="Published"
        count={displayedCount.published}
        active={selectedStatus === "Published"}
        onClick={() => handleStatusClick("Published", displayedCount.published)}
      />

      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
          },
          showCategoryInput,
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        onCollapse={() => {
          setSearchWord("");
          setIsSearchCollapsed(true);
        }}
        onChange={e => setSearchWord(e.target.value)}
      />
      {addCategory && (
        <CategoryInput
          category={category}
          setCategory={setCategory}
          handleSubmit={handleValidation}
        />
      )}
      {categoryList
        .filter(category =>
          searchWord === ""
            ? true
            : category.name.toLowerCase().includes(searchWord.toLowerCase())
        )
        .map((category, index) => (
          <MenuBar.Block
            key={index}
            label={category.name}
            count={category.draft + category.published}
            active={selectedCategory === category.name}
            onClick={() =>
              handleCategoryClick(
                category.name,
                category.draft,
                category.published
              )
            }
          />
        ))}
    </MenuBar>
  );
};

export default Menu;
