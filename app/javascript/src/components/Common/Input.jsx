import React, { useEffect, useRef } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

const FormInput = ({
  value = "",
  setValue = () => {},
  handleSubmit = () => {},
  width = "",
  type = "text",
  check = true,
  label = "",
}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className={width}>
      <Input
        label={label}
        type={type}
        suffix={
          check && (
            <button className="focus:outline-none" onClick={handleSubmit}>
              <Check className="hover:neeto-ui-text-success" />
            </button>
          )
        }
        onChange={e => setValue(e.target.value)}
        className="focus:outline-none focus:shadow-outline-black"
        value={value}
        ref={inputRef}
      />
    </div>
  );
};

export default FormInput;
