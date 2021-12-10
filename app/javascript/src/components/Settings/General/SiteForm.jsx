import React from "react";

import { Typography, Checkbox, Input, Button } from "@bigbinary/neetoui/v2";

const SiteForm = () => {
  //const [showPassword, setShowPassword] = useState(false)
  return (
    <form>
      <Input label="Site Name" />
      <Typography style="h6" weight="normal" className="neeto-ui-text-gray-500">
        Customize the site name which is used to show the site name in
      </Typography>
      <Typography style="h6" weight="bold" className="neeto-ui-text-gray-500">
        Open Graph Tags.
      </Typography>
      <div className="flex flex-row flex-start border-t-2 border-nav-menubar border-solid mt-4 pt-4 ">
        <Checkbox label="" style={{ color: "#6366F1", cursor: "pointer" }} />
        <Typography style="h5" weight="semibold">
          Password Protect Knowledge Base
        </Typography>
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          label="Save Changes"
          style="primary"
          className="bg-indigo-500 "
        />
        <Button
          label="Cancel"
          onClick={() => {}}
          className="text-black ml-4"
          style="link"
        />
      </div>
    </form>
  );
};

export default SiteForm;
