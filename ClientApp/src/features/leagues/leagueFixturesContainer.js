import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { HandshakeTwoTone } from "@mui/icons-material";

import { useTheme } from "@mui/material";

import LeagueDetailsTabMenu from "./components/leagueDetailsTabMenu";
import PermissionWrapperVisibility from "global/components/PermissionWrapper";
import AdminGenerateFixtures from "./components/adminGenerateLeagueSchedule";
import FixtureCalendar from "./components/fixtureCalendar";

export default function LeagueFixturesContainer(props) {
  const [loading, setLoading] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const [updated, setUpdated] = useState(0);
  const [calendarEntries, setCalendarEntries] = useState([]); // [{date: "2021-10-01", events: [{title: "test", description: "test"}]}
  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet(`schedule/${params.leagueUid}`);
        console.log("result:", result);
        setFixtures(result.data);

        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [updated]); //monitor this state and re-call when this updates

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const renderContent = () => {
    console.log(fixtures.length, fixtures);
    return (
      <>
        <Grid item xs={12}>
          {fixtures?.length === 0 && (
            <>
              <Typography>
                There are no fixtures for this league yet.
              </Typography>
            </>
          )}
          {fixtures?.length > 0 && <FixtureCalendar events={fixtures} />}
        </Grid>
      </>
    );
  };

  return (
    <ContentContainer
      title={"League Fixtures"}
      //subtitle="View and Manage your bowling leagues"
      icon={<HandshakeTwoTone fontSize="large" />}
    >
      <Grid item xs={12}>
        <LeagueDetailsTabMenu
          activeTab="fixtures"
          leagueUid={params.leagueUid}
        />

        {loading ? renderLoadingBar() : renderContent()}
      </Grid>
    </ContentContainer>
  );
}
