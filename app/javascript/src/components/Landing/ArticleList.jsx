import React from "react";

import { Dropdown } from "@bigbinary/neetoui/v2";

const ArticleList = () => {
  return (
    <div className="w-full py-5">
      <div className="flex flex-row justify-end px-4 ">
        <div>
          <Dropdown
            buttonStyle="secondary"
            label="Columns"
            closeOnOutsideClick={true}
          >
            <h5 className="font-bold py-2 px-3">Columns</h5>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
