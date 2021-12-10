import React, { useState } from "react";

import { Typography, Toastr } from "@bigbinary/neetoui/v2";

import SiteForm from "./SiteForm";

import Container from "../../Common/Container";
import MenuBar from "../MenuBar";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleSubmit = () => {};

  const handleValidation = e => {
    e.preventDefault();
    const isValidSiteName = siteName.trim().length === 0;
    if (isValidSiteName) {
      Toastr.error(Error("Site Name can't be blank"));
    } else if (!isValidPassword) {
      Toastr.error(
        Error("Invalid Password. Please follow the Password format.")
      );
    } else handleSubmit();
  };
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
          />
        </div>
      </div>
    </Container>
  );
};

export default General;
