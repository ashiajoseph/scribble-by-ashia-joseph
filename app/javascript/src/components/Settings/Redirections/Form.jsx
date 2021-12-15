import React from "react";

import { Check } from "@bigbinary/neeto-icons";

import FormInput from "../../Common/Input";

const Form = () => {
  return (
    <form className="flex flex-row bg-white p-2 rounded-sm my-2 justify-between">
      <FormInput width="w-38" check={false} />
      <FormInput width="w-38" check={false} />

      <button className="w-1/6 flex justify-end focus:outline-none">
        <Check
          className="neeto-ui-text-gray-600 mr-3 hover:neeto-ui-text-success"
          size={30}
        />
      </button>
    </form>
  );
};

export default Form;
