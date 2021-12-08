import axios from "axios";

const create = payload => axios.post("/articles", payload);
const show = id => axios.get(`/articles/${id}`);
const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const articlesApi = {
  create,
  show,
  update,
};
export default articlesApi;
