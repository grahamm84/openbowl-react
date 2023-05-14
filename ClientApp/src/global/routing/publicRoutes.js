import UserActivated from "features/auth/userActivated";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ActivateUser from "../../features/auth/activateUser";
import ForgotPassword from "../../features/auth/forgotPassword";
import ForgotPasswordSetNew from "../../features/auth/forgotPasswordSetNew";
import ForgotPasswordSetThanks from "../../features/auth/forgotPasswordSetThanks";
import ForgotPasswordThanks from "../../features/auth/forgotPasswordThanks";
import Login from "../../features/auth/login";
import RegisterUser from "../../features/auth/registerUser";
import RegisterUserThanks from "../../features/auth/registerUserThanks";
export function PublicRoutes() {
  return (
    <Routes>
      <Route exact path="/register" element={<RegisterUser />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route
        exact
        path="/forgot-password-email-sent"
        element={<ForgotPasswordThanks />}
      />
      <Route exact path="/reset-password" element={<ForgotPasswordSetNew />} />
      <Route exact path="/password-set" element={<ForgotPasswordSetThanks />} />
      <Route
        exact
        path="/register-check-email"
        element={<RegisterUserThanks />}
      />
      <Route exact path="/activate-user" element={<ActivateUser />} />
      <Route exact path="/user-activated" element={<UserActivated />} />

      {/* add error routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
