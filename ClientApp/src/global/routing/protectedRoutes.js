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
import LeagueAdminContainer from "features/leagueAdmin/containers/leagueAdminContainer";
import LeagueAdminContainerList from "features/leagueAdmin/containers/leagueAdminContainerList";
import LeagueAdminTeamsContainer from "features/leagueAdmin/containers/leagueAdminTeamsContainer";
import LeagueAdminFixturesContainer from "features/leagueAdmin/containers/leagueAdminFixtures";
import LeagueAdminSingleFixtureContainer from "features/leagueAdmin/containers/leagueAdminSingleFixtureContainer";
import LeagueAdminResultsContainer from "features/leagueAdmin/containers/leagueAdminResultsContainer";
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

      <Route
        exact
        path="/league-admin/:leagueUid"
        element={<LeagueAdminContainer />}
      />
      <Route
        exact
        path="/league-admin/:leagueUid/teams"
        element={<LeagueAdminTeamsContainer />}
      />
      <Route
        exact
        path="/league-admin/:leagueUid/fixtures/:fixtureId"
        element={<LeagueAdminSingleFixtureContainer />}
      />
      <Route
        exact
        path="/league-admin/:leagueUid/fixtures"
        element={<LeagueAdminFixturesContainer />}
      />
      <Route
        exact
        path="/league-admin/:leagueUid/results"
        element={<LeagueAdminResultsContainer />}
      />
      <Route
        exact
        path="/league-admin"
        element={<LeagueAdminContainerList />}
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
