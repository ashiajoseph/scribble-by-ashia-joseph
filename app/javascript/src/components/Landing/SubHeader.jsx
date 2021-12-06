import React from "react";

import { Dropdown, Checkbox } from "@bigbinary/neetoui/v2";

const SubHeader = ({ tableColumnHeader, setTableColumnHeader }) => {
  const toggleCheckbox = e => {
    const { id, checked } = e.target;
    setTableColumnHeader(prev => {
      return { ...prev, [id]: checked };
    });
  };

  return (
    <div className="flex flex-row justify-end px-4 py-3">
      <div>
        <Dropdown
          buttonStyle="secondary"
          label="Columns"
          closeOnOutsideClick={true}
          closeOnSelect={false}
          className="block z-0"
        >
          <h5 className="font-bold py-2 px-3 ">Columns</h5>
          {Object.keys(tableColumnHeader).map((column, index) => (
            <li key={index} className="capitalize text-color-black">
              <Checkbox
                checked={tableColumnHeader[column]}
                id={column}
                label={column}
                style={{ color: "#6366F1" }}
                onChange={toggleCheckbox}
              />
            </li>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default SubHeader;
