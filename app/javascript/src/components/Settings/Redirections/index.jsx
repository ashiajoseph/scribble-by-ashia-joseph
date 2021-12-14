import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import Container from "../../Common/Container";
import MenuBar from "../MenuBar";

const Redirections = () => {
  return (
    <Container>
      <div className="flex h-full">
        <MenuBar />
        <div className="w-45 mx-auto mt-10 mb-6">
          <Typography
            style="h2"
            className="neeto-ui-text-gray-800 font-semibold mb-1"
          >
            Redirections
          </Typography>
          <Typography
            style="h4"
            className="neeto-ui-text-gray-600 font-normal mb-10"
          >
            Create and configure redirection rules to send users from old links
            to new links. All redirections are performed with 301 status codes
            to be SEO friendly.
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default Redirections;
