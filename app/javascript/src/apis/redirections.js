import axios from "axios";

const create = payload => axios.post("/redirections", payload);
const list = () => axios.get("/redirections");
const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionsApi = {
  create,
  list,
  destroy,
};
export default redirectionsApi;
