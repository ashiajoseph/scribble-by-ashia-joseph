import React from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Dropdown, Checkbox, Input } from "@bigbinary/neetoui/v2";
import { Link } from "react-router-dom";

const SubHeader = ({ tableInstance }) => {
  const { setFilter, allColumns } = tableInstance;

  const handleChange = e => {
    setFilter("title", e.target.value);
  };

  return (
    <div className="flex flex-row justify-end px-4 py-3 items-center">
      <div className="mr-4 w-30">
        <Input
          placeholder="Search article title"
          prefix={<Search />}
          onChange={handleChange}
        />
      </div>
      <div className="mr-4">
        <Dropdown
          buttonStyle="secondary"
          label="Columns"
          closeOnOutsideClick={true}
          closeOnSelect={false}
        >
          <h5 className="font-bold py-2 px-3">Columns</h5>
          {allColumns.slice(0, -2).map(column => (
            <li key={column.id} className="capitalize text-color-black">
              <Checkbox
                label={column.id}
                className="text-indigo-500"
                {...column.getToggleHiddenProps()}
                style={{ color: "#6366F1", cursor: "pointer" }}
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
