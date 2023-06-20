import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "features/home/homePage";
import ProfileContainer from "features/profile/ProfileContainer";
import UserListContainer from "features/users/UserlistContainer";
import MessagesContainer from "features/messages/messagesContainer";
import UserContainer from "features/users/UserContainer";
import UserCreateForm from "features/users/components/UserCreateForm";
import BlankFeature from "features/blankfeature/BlankFeature";
import LeagueListContainer from "features/leagues/leagueListContainer";
import LeagueDetailsContainer from "features/leagues/leagueDetailsContainer";
import LeaguesContainer from "features/leagues/leaguesContainer";
import LeagueTableContainer from "features/leagues/leagueTableContainer";
import LeagueFixturesContainer from "features/leagues/leagueFixturesContainer";
import LeagueStatisticsContainer from "features/leagues/leagueStatisticsContainer";
import LeagueResultsContainer from "features/leagues/leagueResultsContainer";
import LeagueAdminContainer from "features/leagues/leagueAdminContainer";
export function ProtectedRoutes() {
  return (
    <Routes>
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/profile" element={<ProfileContainer />} />
      <Route exact path="/users" element={<UserListContainer />} />
      <Route exact path="/create-user" element={<UserCreateForm />} />
      <Route exact path="/users/:userId" element={<UserContainer />} />
      <Route exact path="/messages" element={<MessagesContainer />} />
      <Route exact path="/blank" element={<BlankFeature />} />
      <Route exact path="/my-leagues" element={<LeagueListContainer />} />
      <Route exact path="/leagues" element={<LeaguesContainer />} />
      <Route
        exact
        path="/league/:leagueUid/table"
        element={<LeagueTableContainer />}
      />
      <Route
        exact
        path="/league/:leagueUid/fixtures"
        element={<LeagueFixturesContainer />}
      />
      <Route
        exact
        path="/league/:leagueUid/statistics"
        element={<LeagueStatisticsContainer />}
      />
      <Route
        exact
        path="/league/:leagueUid/results"
        element={<LeagueResultsContainer />}
      />
      <Route
        exact
        path="/league/:leagueUid/admin"
        element={<LeagueAdminContainer />}
      />
      <Route
        exact
        path="/league/:leagueUid"
        element={<LeagueDetailsContainer />}
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
