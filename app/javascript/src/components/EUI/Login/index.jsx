import React, { useState, useContext } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import LoginImage from "images/login.svg";

import sessionApi from "apis/session";

import FormInput from "../../Common/Input";
import { websiteContext } from "../../Common/PrivateRoute";
import NavBar from "../NavBar";

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { websiteName } = useContext(websiteContext);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await sessionApi.create({
        login: { password: password },
      });
      const { authentication_token } = response.data;
      sessionStorage.setItem("authToken", authentication_token);
      setLoading(false);
      history.push("/public/articles");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar name={websiteName} />
      <div className="w-1/4 mx-auto mt-32">
        <div className="mb-6">
          <img src={LoginImage} className="mx-auto" />
        </div>
        <Typography
          style="h2"
          className="neeto-ui-text-gray-800 font-semibold mb-1"
        >
          {websiteName} is password protected!
        </Typography>
        <Typography
          style="h4"
          className="neeto-ui-text-gray-600 font-normal mb-6"
        >
          Enter the password to gain access to {websiteName}.
        </Typography>
        <FormInput
          label="Password"
          type="password"
          check={false}
          value={password}
          setValue={setPassword}
        />
        <Button
          type="submit"
          label="Continue"
          style="primary"
          className="bg-indigo-500 mt-5"
          loading={loading}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default Login;
