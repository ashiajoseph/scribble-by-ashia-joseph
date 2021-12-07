import React, { useMemo } from "react";

import { useTable } from "react-table";

const Table = ({ tableColumnHeader, articleList }) => {
  const data = useMemo(() => articleList, []);

  const columnHeader = Object.keys(tableColumnHeader)
    .filter(column => tableColumnHeader[column])
    .map(column => {
      return {
        id: column,
        Header: column.toUpperCase(),
        accessor: column,
      };
    });
  const columns = useMemo(() => columnHeader, [tableColumnHeader]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: data });

  return (
    <table {...getTableProps()} className="w-95 mx-auto">
      <thead className="neeto-ui-text-gray-500 text-left font-semibold ">
        {headerGroups.map((headerGroup, ind) => (
          <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, ind) => (
              <th
                key={ind}
                {...column.getHeaderProps()}
                className="py-3 px-1 text-sm"
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
                    className={`capitalize break-all p-2 ${bgColor}`}
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
