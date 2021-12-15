import React from "react";

const Block = ({ from, to }) => {
  const origin = window.location.origin;
  return (
    <div className="flex flex-row bg-white p-3 rounded-sm my-2 justify-between">
      <div className="w-38 break-words">
        <span className="neeto-ui-text-gray-400">{origin}</span>
        <span className="neeto-ui-text-gray-700">{from}</span>
      </div>
      <div className="w-38">
        <span className="neeto-ui-text-gray-700">{origin + to}</span>
      </div>
      <div className="w-1/6"></div>
    </div>
  );
};

export default Block;
