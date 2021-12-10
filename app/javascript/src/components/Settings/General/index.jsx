import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import SiteForm from "./SiteForm";

import Container from "../../Common/Container";
import MenuBar from "../MenuBar";

const General = () => {
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
          <SiteForm />
        </div>
      </div>
    </Container>
  );
};

export default General;
