import React, { useState } from "react";

import { Plus, Search, Close } from "@bigbinary/neeto-icons";
import { Typography, Toastr } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import categoriesApi from "apis/categories";

import CategoryInput from "../Settings/ManageCategories/Input";

const Menu = ({ categoryList, setCategoryList }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [addCategory, setAddCategory] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState("");

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
    <div>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block label="All" count={0} />
        <MenuBar.Block label="Draft" count={0} />
        <MenuBar.Block label="Published" count={0} />

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
            <MenuBar.Block key={index} label={category.name} count={0} />
          ))}
      </MenuBar>
    </div>
  );
};

export default Menu;
