import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;
const timeout = "waiting for too long...Aborted!";

const config = {
  baseURL: BASEURL,
  timeoutErrorMessage: timeout,
  // withCredentials: true,
};

const axiosInstance = axios.create(config);

export default axiosInstance;