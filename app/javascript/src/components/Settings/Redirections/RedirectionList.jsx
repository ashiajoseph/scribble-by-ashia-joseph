import React, { useState, useRef, useContext } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import redirectionsApi from "apis/redirections";

import Block from "./Block";
import Form from "./Form";

import { redirectionContext } from "../../../App";

const RedirectionList = () => {
  const [createList, setCreateList] = useState([]);
  const { redirectionList, setRedirectionList } =
    useContext(redirectionContext);

  const count = useRef(0);

  const deleteRedirection = async (idToBeDeleted, redirectionRef) => {
    try {
      redirectionRef.current.className = "hidden";
      await redirectionsApi.destroy(idToBeDeleted);
      const filteredList = redirectionList.filter(
        ({ id }) => id !== idToBeDeleted
      );
      setRedirectionList(filteredList);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClick = () => {
    setCreateList(prev => [...prev, count.current]);
    count.current += 1;
  };

  const submitRedirection = async (fromPath, toPath, id) => {
    try {
      const response = await redirectionsApi.create({
        redirection: { from: fromPath, to: toPath },
      });
      const { new_redirection } = response.data;

      const filteredList = createList.filter(index => index !== id);
      count.current = filteredList.length === 0 ? 0 : count.current;
      setCreateList(filteredList);
      setRedirectionList(prev => [...prev, new_redirection]);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <div>
        {redirectionList.map((redirection, index) => (
          <Block
            key={index}
            deleteRedirection={deleteRedirection}
            {...redirection}
          />
        ))}
      </div>
      <div>
        {createList.map(index => (
          <Form key={index} id={index} submitRedirection={submitRedirection} />
        ))}
      </div>
      <div>
        <Button
          label="Add New Redirection"
          onClick={handleClick}
          size="large"
          style="link"
          type="button"
          icon={Plus}
          iconPosition="left"
          className="mt-3"
        />
      </div>
    </>
  );
};

export default RedirectionList;
