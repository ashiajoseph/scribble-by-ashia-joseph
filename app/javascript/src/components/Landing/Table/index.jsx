import React from "react";

const Table = ({ tableInstance }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = tableInstance;
  const allColumnsHidden = allColumns
    .slice(0, -2)
    .some(({ isVisible }) => isVisible);
  return (
    <div>
      {allColumnsHidden && (
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
              const bgColor =
                ind % 2 === 0 ? "bg-white" : "neeto-ui-bg-gray-100";
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
      )}
    </div>
  );
};

export default Table;
