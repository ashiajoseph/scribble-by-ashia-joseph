import axios from "axios";

const create = payload => axios.post("/categories", payload);

const categoriesApi = () => {
  create;
};
export default categoriesApi;
