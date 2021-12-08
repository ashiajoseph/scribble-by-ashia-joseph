import axios from "axios";

const create = payload => axios.post("/categories", payload);
const destroy = id => axios.delete(`/categories/${id}`);
const list = () => axios.get("/categories");

const reorder_position = ({ id, payload }) =>
  axios.put(`/categories/${id}/reorder_position`, payload);
const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const categoriesApi = {
  create,
  list,
  reorder_position,
  update,
  destroy,
};
export default categoriesApi;
