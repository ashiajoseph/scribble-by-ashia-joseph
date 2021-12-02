import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

const CategoryInput = ({ setCategory, handleClick }) => {
  return (
    <Input
      suffix={
        <button className="focus:outline-none" onClick={handleClick}>
          <Check className="hover:neeto-ui-text-success" />
        </button>
      }
      onChange={e => setCategory(e.target.value)}
      className="w-1/2 focus:outline-none focus:shadow-outline-black"
    />
  );
};

export default CategoryInput;
