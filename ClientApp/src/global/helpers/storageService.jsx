const storagePrefixKey = window.location.host;

const authTokenKey = storagePrefixKey + "_at";
const refreshTokenKey = storagePrefixKey + "_rt";
const userKey = storagePrefixKey + "_uid";
const usernameKey = storagePrefixKey + "_un";
const displayNameKey = storagePrefixKey + "_dn";
const selectedAdminLeagueKey = storagePrefixKey + "_sal";

function getAuthToken() {
  let token = localStorage.getItem(authTokenKey);
  return token ?? undefined;
}

function getRefreshToken() {
  let refreshToken = localStorage.getItem(refreshTokenKey);
  return refreshToken ?? undefined;
}

function saveUserId(userId) {
  localStorage.setItem(userKey, userId);
  return "ok";
}

function getUserId() {
  let userId = localStorage.getItem(userKey);
  return userId ?? undefined;
}

function saveUsername(username) {
  localStorage.setItem(usernameKey, username);
  return "ok";
}

function getUsername() {
  let username = localStorage.getItem(usernameKey);
  return username ?? undefined;
}

function saveDisplayName(displayName) {
  localStorage.setItem(displayNameKey, displayName);
  return "ok";
}

function getDisplayName() {
  let displayName = localStorage.getItem(displayNameKey);
  return displayName ?? "Sausage";
}

function saveTokens(payload) {
  saveAuthToken(payload.token);
  saveRefreshToken(payload.refreshToken);
  return "ok";
}

function saveAuthToken(token) {
  localStorage.setItem(authTokenKey, token);
  return "ok";
}

function saveRefreshToken(refreshToken) {
  localStorage.setItem(refreshTokenKey, refreshToken);
  return "ok";
}

function clearAuthTokens() {
  localStorage.removeItem(authTokenKey);
  localStorage.removeItem(refreshTokenKey);
  window.location = "/";
}

function clearAll() {
  localStorage.removeItem(authTokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem(usernameKey);
  localStorage.removeItem(userKey);
  localStorage.removeItem(displayNameKey);
  window.location = "/";
}

function clearUser() {
  localStorage.removeItem(usernameKey);
  localStorage.removeItem(userKey);
  window.location = "/";
}

function saveSelectedAdminLeague(selectedAdminLeague) {
  localStorage.setItem(selectedAdminLeagueKey, selectedAdminLeague);
}
function getSelectedAdminLeague() {
  let adminLeague = localStorage.getItem(selectedAdminLeagueKey);
  if (adminLeague !== null) {
    return JSON.parse(adminLeague);
  }
  return adminLeague ?? undefined;
}

function getSelectedAdminLeagueName() {
  let adminLeague = localStorage.getItem(selectedAdminLeagueKey);
  if (adminLeague !== null) {
    var adminLeagueName = JSON.parse(adminLeague).adminLeagueName;
    return adminLeagueName;
  }
  return adminLeague ?? undefined;
}

function getSelectedAdminLeagueUid() {
  let adminLeague = localStorage.getItem(selectedAdminLeagueKey);
  if (adminLeague !== null) {
    var adminLeagueUid = JSON.parse(adminLeague).leagueUid;
    return adminLeagueUid;
  }
  return adminLeague ?? undefined;
}

export {
  getAuthToken,
  getRefreshToken,
  saveTokens,
  saveAuthToken,
  saveRefreshToken,
  clearAuthTokens,
  getUserId,
  getUsername,
  saveUserId,
  saveUsername,
  clearUser,
  clearAll,
  getDisplayName,
  saveDisplayName,
  saveSelectedAdminLeague,
  getSelectedAdminLeague,
  getSelectedAdminLeagueName,
  getSelectedAdminLeagueUid,
};
