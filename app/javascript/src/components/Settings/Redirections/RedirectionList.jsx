import React, { useState, useEffect, useRef } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, PageLoader } from "@bigbinary/neetoui/v2";

import redirectionsApi from "apis/redirections";

import Block from "./Block";
import Form from "./Form";

const RedirectionList = () => {
  const [createList, setCreateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirectionList, setRedirectionList] = useState([]);

  const count = useRef(0);

  const deleteRedirection = async (idToBeDeleted, redirectionRef) => {
    try {
      redirectionRef.current.className = "hidden";
      await redirectionsApi.destroy(idToBeDeleted);
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
      await redirectionsApi.create({
        redirection: { from: fromPath, to: toPath },
      });
      const filteredList = createList.filter(index => index !== id);
      count.current = filteredList.length === 0 ? 0 : count.current;
      setCreateList(filteredList);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchRedirectionList = async () => {
    try {
      const response = await redirectionsApi.list();
      const { redirection_list } = response.data;
      setRedirectionList(redirection_list);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirectionList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

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
