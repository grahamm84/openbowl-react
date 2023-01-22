import UserActivated from "features/auth/userActivated";
import React from "react";
import { Route, Switch, Redirect } from "react-router";
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
    <Switch>
      <Route exact path="/register" component={RegisterUser} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/forgot-password-email-sent"
        component={ForgotPasswordThanks}
      />
      <Route exact path="/reset-password" component={ForgotPasswordSetNew} />
      <Route exact path="/password-set" component={ForgotPasswordSetThanks} />
      <Route
        exact
        path="/register-check-email"
        component={RegisterUserThanks}
      />
      <Route exact path="/activate-user" component={ActivateUser} />
      <Route exact path="/user-activated" component={UserActivated} />

      {/* add error routes */}

      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
