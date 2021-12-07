import React, { useState } from "react";

import { Plus, Search, Close } from "@bigbinary/neeto-icons";
import { Typography, Toastr } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import categoriesApi from "apis/categories";

import CategoryInput from "../Settings/ManageCategories/Input";

const Menu = ({ categoryList, setCategoryList, articlesCount }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [addCategory, setAddCategory] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const handleCategoryClick = categoryName => {
    const name = categoryName === selectedCategory ? "" : categoryName;
    setSelectedCategory(name);
  };
  const handleStatusClick = status => {
    const new_status = status === selectedStatus ? "All" : status;
    setSelectedStatus(new_status);
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
        count={articlesCount.draft + articlesCount.published}
        active={selectedStatus === "All"}
        onClick={() => handleStatusClick("All")}
      />
      <MenuBar.Block
        label="Draft"
        count={articlesCount.draft}
        active={selectedStatus === "Draft"}
        onClick={() => handleStatusClick("Draft")}
      />
      <MenuBar.Block
        label="Published"
        count={articlesCount.published}
        active={selectedStatus === "Published"}
        onClick={() => handleStatusClick("Published")}
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
            count={category.article_list.length}
            active={selectedCategory === category.name}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
    </MenuBar>
  );
};

export default Menu;
