import axios from "axios";

const create = payload => axios.post("/articles", payload);
const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const articlesApi = {
  create,
  update,
};
export default articlesApi;
