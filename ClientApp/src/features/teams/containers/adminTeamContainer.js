// Import dependencies
import React, { useState, useEffect } from "react";
import * as api from "global/apiClient";
import * as storage from "global/helpers/storageService";
import { Grid, LinearProgress, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import TeamEditCard from "../components/teamEditCard";
import { useParams } from "react-router-dom";

function AdminTeamContainer() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamsUpdated, setTeamsUpdated] = useState(0);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let currentLeagueId = params.leagueUid;
        if (currentLeagueId) {
          const result = await api.apiGet(`teams?leagueId=${currentLeagueId}`);
          console.log(result);
          setTeams(result.data);
          setLoading(false);
        }
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [teamsUpdated]);

  const refreshOnUpdate = () => {
    console.log("refreshOnUpdate");
    setTeamsUpdated(teamsUpdated + 1);
  };

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const renderContent = () => {
    console.log(teams.length, teams);
    return (
      <>
        <Grid item xs={12}>
          {teams?.length === 0 && (
            <>
              <Typography>There are no teams for this league yet.</Typography>
            </>
          )}

          {teams?.length > 0 && (
            <Grid container spacing={2}>
              {teams.map((team) => (
                <Grid key={team.teamUid} item xs={12} md={6}>
                  <TeamEditCard
                    key={team.teamUid}
                    team={team}
                    refreshOnUpdate={refreshOnUpdate}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </>
    );
  };

  return loading ? renderLoadingBar() : renderContent();
}

export default AdminTeamContainer;
