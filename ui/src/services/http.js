import axios from "axios";
import { toast } from "react-toastify";

export function refreshRequestToken() {
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
}
refreshRequestToken();
axios.defaults.baseURL = `http://localhost:3900/api`;
axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status >= 403) {
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(err);
});

const service = {
  refreshRequestToken,
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  post: axios.post,
  delete: axios.delete,
};

export default service;
