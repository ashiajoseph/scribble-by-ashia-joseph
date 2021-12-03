import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

const CategoryInput = ({ category = "", setCategory, handleClick }) => {
  return (
    <div className="w-1/2">
      <Input
        suffix={
          <button className="focus:outline-none" onClick={handleClick}>
            <Check className="hover:neeto-ui-text-success" />
          </button>
        }
        onChange={e => setCategory(e.target.value)}
        className="focus:outline-none focus:shadow-outline-black"
        value={category}
      />
    </div>
  );
};

export default CategoryInput;
