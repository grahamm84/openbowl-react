// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import * as storageService from "./helpers/storageService";
import * as api from "./apiClient";
import jwt_decode from "jwt-decode";
import { AdminRole } from "./helpers/UserRoleConstants";
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  var currentUser = null;

  let authToken = storageService.getAuthToken();
  let refreshToken = storageService.getRefreshToken();

  if (authToken && refreshToken) {
    currentUser = { token: authToken, refreshToken: refreshToken };
  }

  const [user, setUser] = useState(currentUser);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (values) => {
    return api.apiPost("auth/login", values).then(
      (result) => {
        storageService.saveTokens({
          token: result.data.token,
          refreshToken: result.data.refreshToken,
        });

        storageService.saveUserId(result.data.userId);
        storageService.saveUsername(result.data.username);

        setUser(result.data);
        return result.data;
      },
      (error) => {
        return error;
      }
    );
  };

  const refreshTokens = () => {
    let values = {
      token: storageService.getAuthToken(),
      refreshToken: storageService.getRefreshToken(),
    };

    return api.apiPost("auth/refreshAuthentication", values).then(
      (result) => {
        storageService.saveTokens({
          token: result.data.token,
          refreshToken: result.data.refreshToken,
        });

        setUser({
          token: result.data.token,
          refreshToken: result.data.refreshToken,
        });

        return result.data;
      },
      (error) => {
        storageService.clearAuthTokens();
        storageService.clearUser();
        return error;
      }
    );
  };

  const register = (values) => {
    return api.apiPost("auth/register", values).then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
  };

  const logout = () => {
    let token = storageService.getAuthToken();

    return api.apiPost("auth/logout", token).then(
      (result) => {
        storageService.clearAll();
        setUser(false);
        return result;
      },
      (error) => {
        setUser(false);
        return error;
      }
    );
  };

  const sendPasswordResetEmail = (email) => {
    return api.apiPost("auth/request-password-reset", email).then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
  };

  const confirmPasswordReset = (values) => {
    return api.apiPost("auth/reset-password", values).then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
  };

  const activateUser = (values) => {
    return api.apiPost("auth/activate-account", values).then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
  };

  const doIHavePermission = (permission = []) => {
    let token = storageService.getAuthToken();
    if (token !== null) {
      let decodedToken = jwt_decode(token);
      if (!decodedToken || !decodedToken.role) {
        return false;
      }
      var hasMultipleRoles = Array.isArray(decodedToken.role);
      if (hasMultipleRoles) {
        for (var i = 0; i < decodedToken.role.length; i++) {
          if (
            permission.includes(
              decodedToken.role[i] || decodedToken.role[i] === AdminRole
            )
          ) {
            return true;
          }
        }
        return false;
      } else {
        var result =
          permission.includes(decodedToken.role) ||
          decodedToken.role === AdminRole;
        return result;
      }
    } else {
      return false;
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    //alert("using useEffect on Auth");
    if (user === null) {
      let authToken = storageService.getAuthToken();
      let refreshToken = storageService.getRefreshToken();
      let isValid = false;
      if (authToken && refreshToken) {
        isValid = true;
      }

      if (isValid) {
        setUser({ token: authToken, refreshToken: refreshToken });
      } else setUser(false);
    }

    const unsubscribe = (token) => {
      if (isValid) {
        setUser({ token: authToken, refreshToken: refreshToken });
      } else {
        setUser(false);
      }
    };

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    login,
    register,
    refreshTokens,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    activateUser,
    doIHavePermission,
  };
}

// Based on: https://usehooks.com/useAuth/
