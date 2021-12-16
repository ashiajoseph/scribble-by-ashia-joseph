import axios from "axios";

const create = payload => axios.post("/redirections", payload);
const list = () => axios.get("/redirections");
const destroy = id => axios.delete(`/redirections/${id}`);
const update = ({ id, payload }) => axios.put(`/redirections/${id}`, payload);

const redirectionsApi = {
  create,
  list,
  destroy,
  update,
};
export default redirectionsApi;
