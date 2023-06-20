import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import { Grid, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { HandshakeTwoTone } from "@mui/icons-material";

import { useTheme } from "@mui/material";

import LeagueDetailsTabMenu from "./components/leagueDetailsTabMenu";

export default function LeagueResultsContainer() {
  const [loading, setLoading] = useState(false);
  const [league, setLeague] = useState([{}]);
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet(`league/${params.leagueUid}`);
        console.log(result);
        setLeague(result.data);
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [leagueUpdated]); //monitor this state and re-call when this updates

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <>
        <Grid item xs={12}>
          <h3>Test Results</h3>
        </Grid>
      </>
    );
  };

  return (
    <ContentContainer
      title={league.leagueName ?? "League Results"}
      //subtitle="View and Manage your bowling leagues"
      icon={<HandshakeTwoTone fontSize="large" />}
    >
      <Grid item xs={12}>
        <LeagueDetailsTabMenu
          activeTab="results"
          leagueUid={params.leagueUid}
        />

        {loading ? renderLoadingBar() : renderContent()}
      </Grid>
    </ContentContainer>
  );
}
