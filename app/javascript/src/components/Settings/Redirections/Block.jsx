import React, { useState, useRef } from "react";

import Form from "./Form";

const Block = ({ id, from, to, deleteRedirection }) => {
  const origin = window.location.origin;
  const redirectionRef = useRef();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = () => {
    const toBeDeleted = window.confirm(
      `Are you sure you want to delete the redirection?`
    );
    if (toBeDeleted) deleteRedirection(id, redirectionRef);
  };

  return (
    <>
      {!showEditForm && (
        <div
          className="flex flex-row bg-white p-3 rounded-sm my-2 justify-between"
          ref={redirectionRef}
        >
          <div className="w-38 break-words">
            <span className="neeto-ui-text-gray-400">{origin}</span>
            <span className="neeto-ui-text-gray-700">{from}</span>
          </div>
          <div className="w-38">
            <span className="neeto-ui-text-gray-700">{origin + to}</span>
          </div>
          <div className="w-1/6 flex flex-row justify-evenly">
            <button className="focus:outline-none" onClick={handleDelete}>
              <i className="ri-delete-bin-line neeto-ui-text-gray-600 mr-3 hover:text-red-600 text-md"></i>
            </button>
            <button
              className="focus:outline-none"
              onClick={() => setShowEditForm(true)}
            >
              <i className="ri-pencil-line neeto-ui-text-gray-600 hover:text-black  text-md"></i>
            </button>
          </div>
        </div>
      )}
      {showEditForm && <Form />}
    </>
  );
};

export default Block;
