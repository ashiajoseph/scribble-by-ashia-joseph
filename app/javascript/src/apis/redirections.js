import axios from "axios";

const create = payload => axios.post("/redirections", payload);

const redirectionsApi = {
  create,
};
export default redirectionsApi;
