import axios from "axios";

const show = () => axios.get("/website");
const update = payload => axios.put("/website", payload);

const websiteApi = {
  show,
  update,
};
export default websiteApi;
