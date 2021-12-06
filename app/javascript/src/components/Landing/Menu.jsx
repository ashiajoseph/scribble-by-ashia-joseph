import React, { useState } from "react";

import { Plus, Search, Close } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import CategoryInput from "../Settings/ManageCategories/Input";

const Menu = ({ categoryList }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [addCategory, setAddCategory] = useState(false);

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
          onCollapse={() => setIsSearchCollapsed(true)}
        />
        {addCategory && <CategoryInput />}
        {categoryList.map((category, index) => (
          <MenuBar.Block key={index} label={category.name} count={0} />
        ))}
      </MenuBar>
    </div>
  );
};

export default Menu;
