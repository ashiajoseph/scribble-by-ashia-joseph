import React, { useState, useContext } from "react";

import redirectionsApi from "apis/redirections";

import Form from "./Form";

import { redirectionContext } from "../../../App";

const Block = ({ id, from, to, deleteRedirection }) => {
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { fetchRedirectionList } = useContext(redirectionContext);
  const origin = window.location.origin;

  const handleDelete = () => {
    const toBeDeleted = window.confirm(
      `Are you sure you want to delete the redirection?`
    );
    if (toBeDeleted) deleteRedirection(id);
  };

  const handleEdit = async (fromPath, toPath) => {
    setLoading(true);
    try {
      await redirectionsApi.update({
        id: id,
        payload: { from: fromPath, to: toPath },
      });
      fetchRedirectionList();
      setShowEditForm(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-3 rounded-sm my-2 text-gray-400">
        Editing ...
      </div>
    );
  }

  return (
    <>
      {!showEditForm && (
        <div className="flex flex-row bg-white p-3 rounded-sm my-2 justify-between">
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
      {showEditForm && (
        <Form from={from} to={to} submitRedirection={handleEdit} />
      )}
    </>
  );
};

export default Block;
