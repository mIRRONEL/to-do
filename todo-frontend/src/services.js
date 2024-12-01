import axios from "axios";

const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || "http://replace-with-fqdn:4000";

const instance = axios.create({
  baseURL: backendBaseUrl,
});

export default instance;
