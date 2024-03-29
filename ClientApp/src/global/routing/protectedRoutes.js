import React from "react";
import { Route, Switch, Redirect } from "react-router";
import HomePage from "features/home/homePage";
import ProfileContainer from "features/profile/ProfileContainer";
import UserListContainer from "features/users/UserlistContainer";
import MessagesContainer from "features/messages/messagesContainer";
import UserContainer from "features/users/UserContainer";
import UserCreateForm from "features/users/components/UserCreateForm";
import BlankFeature from "features/blankfeature/BlankFeature";
import LeagueListContainer from "features/leagues/leagueListContainer";
import LeaguesContainer from "features/leagues/leaguesContainer";
export function ProtectedRoutes() {
  return (
    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/users" component={UserListContainer} />
      <Route exact path="/create-user" component={UserCreateForm} />
      <Route exact path="/users/:userId" component={UserContainer} />
      <Route exact path="/messages" component={MessagesContainer} />
      <Route exact path="/blank" component={BlankFeature} />
      {/* <Route exact path="/my-leagues" component={LeagueListContainer} /> */}
      <Route exact path="/my-leagues" component={LeaguesContainer} />
      <Route>
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}
