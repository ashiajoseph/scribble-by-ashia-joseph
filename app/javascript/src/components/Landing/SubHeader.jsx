import React from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Dropdown, Checkbox, Input } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const SubHeader = ({ tableColumnHeader, setTableColumnHeader }) => {
  const toggleCheckbox = e => {
    const { id, checked } = e.target;
    setTableColumnHeader(prev => {
      return { ...prev, [id]: checked };
    });
  };

  return (
    <div className="flex flex-row justify-end px-4 py-3 items-center">
      <div className="mr-4 w-30">
        <Input placeholder="Search article title" prefix={<Search />} />
      </div>
      <div className="mr-4">
        <Dropdown
          buttonStyle="secondary"
          label="Columns"
          closeOnOutsideClick={true}
          closeOnSelect={false}
        >
          <h5 className="font-bold py-2 px-3">Columns</h5>
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
      <div>
        <Link
          to={"/articles/new"}
          className="p-2 bg-indigo-500 text-white flex flex-row font-semibold rounded	"
        >
          Add new article <Plus size={18} />
        </Link>
      </div>
    </div>
  );
};

export default SubHeader;
