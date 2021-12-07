import React, { useMemo } from "react";

import { useTable } from "react-table";

const Table = ({ tableColumnHeader, articleList }) => {
  const data = useMemo(() => articleList, []);

  const applyStyle = column => {
    let style = "";
    const cols = ["author", "category", "status"];
    if (column === "title") style = "text-indigo-500 font-medium";
    else if (cols.includes(column)) style = "neeto-ui-text-gray-600";

    return style;
  };

  const filteredColumns = Object.keys(tableColumnHeader).filter(
    column => tableColumnHeader[column]
  );
  const columnHeader = filteredColumns.map(column => {
    return {
      id: column,
      Header: column.toUpperCase(),
      accessor: column,
      Cell: ({ row }) => (
        <span className={applyStyle(column)}>{row.values[column]}</span>
      ),
    };
  });

  if (filteredColumns.length !== 0) {
    columnHeader.push(
      {
        id: "delete",
        width: 35,
        Cell: () => (
          <button className="focus:outline-none" onClick={() => {}}>
            <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3 hover:text-red-600 text-md"></i>
          </button>
        ),
      },
      {
        id: "edit",
        width: 40,
        Cell: () => (
          <button className="focus:outline-none" onClick={() => {}}>
            <i className="ri-pencil-line neeto-ui-text-gray-600 hover:text-black  text-md"></i>
          </button>
        ),
      }
    );
  }
  const columns = useMemo(() => columnHeader, [tableColumnHeader]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: data });

  return (
    <table {...getTableProps()} className="w-95 mx-auto">
      <thead className="neeto-ui-text-gray-500 text-left font-semibold">
        {headerGroups.map((headerGroup, ind) => (
          <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, ind) => (
              <th
                key={ind}
                {...column.getHeaderProps()}
                className="py-3 pl-3 pr-1 text-sm"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, ind) => {
          prepareRow(row);
          const bgColor = ind % 2 === 0 ? "bg-white" : "neeto-ui-bg-gray-100";
          return (
            <tr key={ind} {...row.getRowProps()} className="text-base ">
              {row.cells.map((cell, ind) => {
                return (
                  <td
                    key={ind}
                    {...cell.getCellProps({
                      style: {
                        width: cell.column.width,
                      },
                    })}
                    className={`capitalize break-all pl-3 pr-1 py-3 ${bgColor}`}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
