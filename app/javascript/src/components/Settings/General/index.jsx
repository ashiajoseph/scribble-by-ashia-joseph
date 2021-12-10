import React, { useState, useEffect } from "react";

import { Typography, Toastr } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import websiteApi from "apis/website";

import SiteForm from "./SiteForm";

import Container from "../../Common/Container";
import MenuBar from "../MenuBar";

const General = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [siteName, setSiteName] = useState("");

  const handleSubmit = () => {};

  const handleValidation = e => {
    e.preventDefault();
    const isValidSiteName = siteName.trim().length === 0;
    if (isValidSiteName) {
      Toastr.error(Error("Site Name can't be blank"));
    } else if (showPassword && !isValidPassword) {
      Toastr.error(
        Error("Invalid Password. Please follow the Password format.")
      );
    } else handleSubmit();
  };

  const fetchWebsiteDetails = async () => {
    try {
      await websiteApi.show();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex h-full">
        <MenuBar />
        <div className="w-28 mx-auto mt-6 mb-6">
          <Typography
            style="h3"
            className="neeto-ui-text-gray-800 font-semibold mb-1"
          >
            General Settings
          </Typography>
          <Typography
            style="h4"
            className="neeto-ui-text-gray-600 font-normal mb-10"
          >
            Configure general attributes of scribble.
          </Typography>
          <SiteForm
            password={password}
            setPassword={setPassword}
            siteName={siteName}
            setSiteName={setSiteName}
            handleValidation={handleValidation}
            setIsValidPassword={setIsValidPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>
    </Container>
  );
};

export default General;
