import React, { useState, useRef } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import Form from "./Form";

const RedirectionList = () => {
  const [createList, setCreateList] = useState([]);
  const count = useRef(0);
  const handleClick = () => {
    setCreateList(prev => [...prev, count.current]);
    count.current += 1;
  };

  const submitRedirection = (fromPath, toPath, id) => {
    fromPath, toPath;
    const filteredList = createList.filter(index => index !== id);
    count.current = filteredList.length === 0 ? 0 : count.current;
    setCreateList(filteredList);
  };

  return (
    <>
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
