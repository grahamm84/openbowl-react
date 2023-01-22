import config from "../config";
import * as storage from "../global/helpers/storageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = config.baseUrl;

function refreshAuthenticationTokens() {
  const headers = { "Content-Type": "application/json" };

  const refreshConfig = {
    method: "POST",
    headers: {
      ...headers,
    },
  };

  const refreshBody = JSON.stringify({
    token: storage.getAuthToken(),
    RefreshToken: storage.getRefreshToken(),
  });

  refreshConfig.body = refreshBody;
  return window
    .fetch(`${baseUrl}/auth/refresh-authentication`, refreshConfig)
    .then(
      async (refreshResponse) => {
        if (refreshResponse.ok === true) {
          let refreshData = await refreshResponse.json();
          if (refreshData.wasSuccessful) {
            storage.saveTokens({
              token: refreshData.model.token,
              refreshToken: refreshData.model.refreshToken,
            });

            return Promise.resolve(refreshData);
          }
        } else {
          storage.clearAuthTokens();
          storage.clearUser();
          return Promise.reject(undefined);
        }
      },
      async (secondError) => {
        storage.clearAuthTokens();
        storage.clearUser();
        return Promise.reject(secondError);
      }
    );
}

function apiClient(endpoint, methodType, { body, ...customConfig } = {}) {
  const token = storage.getAuthToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: methodType,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window
    .fetch(`${baseUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        if (config.isAuthRetry) {
          storage.clearAuthTokens();
          storage.clearUser();
        } else {
          var refreshResult = await refreshAuthenticationTokens();
          return apiClient(endpoint, methodType, body);
        }
      }

      const data = await response.json();
      if (response.ok) {
        if (data.wasSuccessful) {
          return Promise.resolve({
            data: data.model,
            information: data.messages,
            errors: undefined,
          });
        } else {
          // API wasn't successful
          return Promise.reject({
            data: data.model,
            information: data.messages,
            errors: data.errors,
          });
        }
      } else {
        // response was not ok.
        return Promise.reject(data);
      }
    });
}

function apiGet(
  endpoint,
  useToast,
  toastMessagePending,
  toastMessageSuccess,
  toastMessageFailure
) {
  if (useToast) {
    const result = toast.promise(apiClient(endpoint, "GET"), {
      pending: toastMessagePending ?? "Loading",
      success: toastMessageSuccess ?? "Success",
      error: toastMessageFailure ?? "Failed",
    });
    return result;
  } else {
    const result = apiClient(endpoint, "GET");
    return result;
  }
}

function apiPost(
  endpoint,
  payload,
  useToast,
  toastMessagePending,
  toastMessageSuccess,
  toastMessageFailure
) {
  if (useToast) {
    const result = toast.promise(
      apiClient(endpoint, "POST", { body: payload }),
      {
        pending: toastMessagePending ?? "Loading",
        success: toastMessageSuccess ?? "Success",
        error: toastMessageFailure ?? "Failed",
      }
    );
    return result;
  } else {
    const result = apiClient(endpoint, "POST", { body: payload });
    return result;
  }
}

function apiDelete(endpoint) {}

function apiCreate(
  endpoint,
  payload,
  useToast,
  toastMessagePending,
  toastMessageSuccess,
  toastMessageFailure
) {
  if (useToast) {
    const result = toast.promise(
      apiClient(endpoint, "PUT", { body: payload }),
      {
        pending: toastMessagePending ?? "Loading",
        success: toastMessageSuccess ?? "Success",
        error: toastMessageFailure ?? "Failed",
      }
    );
    return result;
  } else {
    const result = apiClient(endpoint, "PUT", { body: payload });
    return result;
  }
}

export { apiGet, apiPost, apiDelete, apiCreate };
