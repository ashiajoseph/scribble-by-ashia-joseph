import axios from "axios";

const create = payload => axios.post("/categories", payload);
const destroy = id => axios.delete(`/categories/${id}`);
const list = () => axios.get("/categories");

const reorder_position = ({ id, payload }) =>
  axios.put(`/categories/${id}/reorder_position`, payload);

const retrieve_category_and_article_list = () =>
  axios.get("/categories/retrieve_category_and_article_list");

const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const categoriesApi = {
  create,
  destroy,
  list,
  reorder_position,
  retrieve_category_and_article_list,
  update,
};
export default categoriesApi;
