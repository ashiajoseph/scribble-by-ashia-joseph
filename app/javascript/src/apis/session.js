import axios from "axios";

const create = payload => axios.post("/session", payload);

const sessionApi = {
  create,
};
export default sessionApi;
