import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Input, Button } from "@bigbinary/neetoui/v2";
import LoginImage from "images/login.svg";

import websiteApi from "apis/website";

import NavBar from "../NavBar";

const Login = () => {
  const [loading, setLoading] = useState(true);
  //const [password, setPassword] = useState("")
  const [websiteName, setWebsiteName] = useState("");

  const fetchWebsiteInfo = async () => {
    try {
      const response = await websiteApi.show();
      const { website } = response.data;
      setWebsiteName(website.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteInfo();
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
        <Input label="Password" type="password" />
        <Button
          type="submit"
          label="Continue"
          style="primary"
          className="bg-indigo-500 mt-5"
        />
      </div>
    </>
  );
};

export default Login;
