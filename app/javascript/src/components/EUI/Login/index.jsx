import React, { useState, useEffect } from "react";

import { PageLoader, Typography } from "@bigbinary/neetoui/v2";
import LoginImage from "images/login.svg";

import websiteApi from "apis/website";

import NavBar from "../NavBar";

const Login = () => {
  const [loading, setLoading] = useState(true);
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
      <div className="w-28 mx-auto">
        <div>
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
          className="neeto-ui-text-gray-600 font-normal mb-10"
        >
          Enter the password to gain access to {websiteName}.
        </Typography>
      </div>
    </>
  );
};

export default Login;
