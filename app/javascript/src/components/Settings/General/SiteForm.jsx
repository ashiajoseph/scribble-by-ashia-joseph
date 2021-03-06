import React, { useState } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Checkbox, Input, Button } from "@bigbinary/neetoui/v2";
import { isNil } from "ramda";

import FormInput from "../../Common/Input";

const SiteForm = ({
  password,
  setPassword,
  siteName,
  setSiteName,
  handleValidation,
  setIsValidPassword,
  showPassword,
  setShowPassword,
  defaultWebsiteInfo,
}) => {
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\S]+)$/;

  const [passwordHasDigitAndAlphabet, setPasswordHasDigitAndAlphabet] =
    useState(false);
  const [passwordValidLength, setPasswordValidLength] = useState(0);
  const handleCancel = () => {
    setSiteName(defaultWebsiteInfo);
    setPassword(null);
    setShowPassword(false);
  };

  const handleCheckboxChange = e => {
    setShowPassword(e.target.checked);
    setPassword(null);
  };

  const checkPasswordValid = passwordCandidate => {
    const passwordHasRequiredLength = passwordCandidate.length >= 6;
    const passwordFollowsFormat = regex.test(passwordCandidate);
    setPasswordValidLength(passwordHasRequiredLength);
    setPasswordHasDigitAndAlphabet(passwordFollowsFormat);
    return passwordHasRequiredLength && passwordFollowsFormat;
  };

  const handlePasswordChange = e => {
    const passwordCandidate = e.target.value;
    const followsPasswordFormat = checkPasswordValid(passwordCandidate);
    setIsValidPassword(followsPasswordFormat);
    setPassword(passwordCandidate);
  };

  return (
    <form>
      <FormInput
        label="Site Name"
        check={false}
        value={siteName}
        setValue={setSiteName}
      />
      <Typography
        style="h6"
        weight="normal"
        className="neeto-ui-text-gray-500 mt-2"
      >
        Customize the site name which is used to show the site name in
      </Typography>
      <Typography style="h6" weight="bold" className="neeto-ui-text-gray-500">
        Open Graph Tags.
      </Typography>
      <div className="flex flex-row flex-start border-t-2 border-nav-menubar border-solid my-4 pt-4 ">
        <Checkbox
          label="Password Protect Knowledge Base"
          style={{ color: "#6366F1", cursor: "pointer" }}
          onChange={handleCheckboxChange}
          checked={showPassword}
        />
      </div>
      {showPassword && (
        <div className="w-7/12">
          <Input
            label="Password"
            type="password"
            value={password ? password : ""}
            onChange={handlePasswordChange}
          />
          {!isNil(password) && (
            <div className="my-1">
              <div className="flex flex-row my-2">
                {passwordValidLength ? (
                  <Check size={16} className="neeto-ui-text-success" />
                ) : (
                  <Close size={16} className="neeto-ui-text-error" />
                )}
                <Typography style="h6" weight="normal">
                  Have atleast 6 characters
                </Typography>
              </div>
              <div className="flex flex-row my-2">
                {passwordHasDigitAndAlphabet ? (
                  <Check size={16} className="neeto-ui-text-success" />
                ) : (
                  <Close size={16} className="neeto-ui-text-error" />
                )}
                <Typography style="h6" weight="normal">
                  Include at least 1 letter and 1 number
                </Typography>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-6">
        <Button
          type="submit"
          label="Save Changes"
          style="primary"
          className="bg-indigo-500 "
          onClick={handleValidation}
        />
        <Button
          label="Cancel"
          onClick={handleCancel}
          className="text-black ml-4"
          style="link"
        />
      </div>
    </form>
  );
};

export default SiteForm;
