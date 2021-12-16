import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";

import FormInput from "../../Common/Input";

const Form = ({ id, submitRedirection, from = "", to = "" }) => {
  const [fromPath, setFromPath] = useState(from);
  const [toPath, setToPath] = useState(to);
  const origin = window.location.origin;

  const handleSubmit = e => {
    e.preventDefault();
    submitRedirection(fromPath, toPath, id);
  };

  return (
    <form
      id={id}
      className="flex flex-row bg-white p-2 rounded-sm my-2 justify-between"
      onSubmit={handleSubmit}
    >
      <FormInput
        width="w-38"
        check={false}
        prefix={origin}
        value={fromPath}
        setValue={setFromPath}
        style={{ paddingLeft: "0" }}
      />
      <FormInput
        width="w-38"
        check={false}
        prefix={origin}
        value={toPath}
        setValue={setToPath}
        style={{ paddingLeft: "0" }}
      />

      <button
        className="w-1/6 flex justify-end focus:outline-none"
        type="submit"
      >
        <Check
          className="neeto-ui-text-gray-600 mr-4 hover:neeto-ui-text-success"
          size={28}
        />
      </button>
    </form>
  );
};

export default Form;
