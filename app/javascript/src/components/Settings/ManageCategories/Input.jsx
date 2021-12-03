import React, { useEffect, useRef } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

const CategoryInput = ({ category = "", setCategory, handleSubmit }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="w-1/2">
      <Input
        suffix={
          <button className="focus:outline-none" onClick={handleSubmit}>
            <Check className="hover:neeto-ui-text-success" />
          </button>
        }
        onChange={e => setCategory(e.target.value)}
        className="focus:outline-none focus:shadow-outline-black"
        value={category}
        ref={inputRef}
      />
    </div>
  );
};

export default CategoryInput;
