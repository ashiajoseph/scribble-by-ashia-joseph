import axios from "axios";

const create = payload => axios.post("/articles", payload);

const articlesApi = {
  create,
};
export default articlesApi;
