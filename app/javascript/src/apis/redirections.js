import axios from "axios";

const create = payload => axios.post("/redirections", payload);
const list = () => axios.get("/redirections");
const redirectionsApi = {
  create,
  list,
};
export default redirectionsApi;
