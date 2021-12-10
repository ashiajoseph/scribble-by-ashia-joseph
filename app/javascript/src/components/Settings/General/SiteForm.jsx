import React from "react";

import { Typography, Input } from "@bigbinary/neetoui/v2";

const SiteForm = () => {
  return (
    <form>
      <Input label="Site Name" />
      <Typography style="h6" weight="normal" className="neeto-ui-text-gray-500">
        Customize the site name which is used to show the site name in
      </Typography>
      <Typography style="h6" weight="bold" className="neeto-ui-text-gray-500">
        Open Graph Tags.
      </Typography>
    </form>
  );
};

export default SiteForm;
