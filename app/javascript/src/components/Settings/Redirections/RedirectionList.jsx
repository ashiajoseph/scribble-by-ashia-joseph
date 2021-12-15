import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import Form from "./Form";

const RedirectionList = () => {
  return (
    <div>
      <Form />
      <Button
        label="Add New Redirection"
        onClick={() => {}}
        size="large"
        style="link"
        type="button"
        icon={Plus}
        iconPosition="left"
        className="mt-3"
      />
    </div>
  );
};

export default RedirectionList;
