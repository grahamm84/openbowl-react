let baseUrl = "https://localhost:44387/api";

if (process.env.NODE_ENV !== "development" && window.API_URL !== "%API_URL%") {
  baseUrl = window.API_URL;
}

/**
 * Config options
 * @type {{baseUrl: string}}
 */
export default { baseUrl };