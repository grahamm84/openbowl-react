import config from "../config";
import * as storage from "./helpers/storageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//const axios = require('axios');
const baseUrl = config.baseUrl;

const axios_instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let access_token = storage.getAuthToken();

axios_instance.interceptors.request.use((c) => {
  c.headers["Authorization"] = `Bearer ${access_token}`;
  c.headers["ReactClient"] = "Axios";
  return c;
});

function refresh_token() {
  return axios.post(`${baseUrl}/auth/refresh-authentication`, {
    token: storage.getAuthToken(),
    RefreshToken: storage.getRefreshToken(),
  });
}

let refreshing_token = null;

axios_instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const c = error.config;
    if (error.response && error.response.status === 401 && !c._retry) {
      c._retry = true;
      try {
        refreshing_token = refreshing_token
          ? refreshing_token
          : refresh_token();
        let res = await refreshing_token;
        refreshing_token = null;
        if (res.data.access_token) {
          access_token = res.data.access_token;
        }
        return axios_instance(config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

function request() {
  axios_instance
    .get("/access")
    .then(function (response) {})
    .catch((err) => {});
}

function apiGet(
  endpoint,
  useToast,
  toastMessagePending,
  toastMessageSuccess,
  toastMessageFailure
) {
  if (useToast) {
    const result = toast.promise(axios_instance.get(endpoint), {
      pending: toastMessagePending ?? "Loading",
      success: toastMessageSuccess ?? "Success",
      error: toastMessageFailure ?? "Failed",
    });
    return result.data;
  } else {
    const result = axios_instance.get(endpoint);
    return result.data;
  }
}

export { apiGet, request };
