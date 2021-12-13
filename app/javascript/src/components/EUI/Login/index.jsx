import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

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
    <div>
      <NavBar name={websiteName} />
    </div>
  );
};

export default Login;
