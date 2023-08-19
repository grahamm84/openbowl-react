// Import dependencies
import React, { useState, useEffect } from "react";
import * as api from "global/apiClient";
import * as storage from "global/helpers/storageService";
import {
  Grid,
  LinearProgress,
  List,
  ListItem,
  Select,
  Stack,
  ListItemAvatar,
  ListItemText,
  Table,
  MenuItem,
} from "@mui/material";
import { Typography } from "@mui/material";
import { set } from "date-fns";
import AdminEventListItem from "../components/adminEventListItem";
import AdminNoFixturesButton from "../components/adminNoFixturesButton";
import AdminGenerateFixtures from "features/leagues/components/adminGenerateLeagueSchedule";
import { useParams } from "react-router-dom";

function AdminScheduleContainer(props) {
  const [schedule, setSchedule] = useState([]);
  const [activeSchedule, setActiveSchedule] = useState();
  const [activeScheduleId, setActiveScheduleId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scheduleUpdated, setScheduleUpdated] = useState(0);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let currentLeagueId = params.leagueUid;
        if (currentLeagueId) {
          const result = await api.apiGet(`schedule/${currentLeagueId}`);
          console.log("schedule by leagueId", result);
          setSchedule(result.data);
          setLoading(false);
        }
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [scheduleUpdated]);

  const refreshOnUpdate = () => {
    console.log("refreshOnUpdate");
    setScheduleUpdated(scheduleUpdated + 1);
  };

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const getScheduleText = (schedule) => {
    return `${schedule.definition.numberOfOccurunces} slots | ${schedule.eventsUtc.length} events`;
  };

  const renderContent = () => {
    console.log(schedule.length, schedule);
    return (
      <>
        <Stack spacing={2}>
          {!schedule?.definition && (
            <>
              <Typography>
                There are no schedules for this league yet.
              </Typography>
              <AdminGenerateFixtures
                teamCount={props.teamCount ?? 0}
                saveAndClose={refreshOnUpdate}
              />
            </>
          )}

          {schedule?.definition && (
            <Stack spacing={2} direction="row">
              <AdminNoFixturesButton leagueId={params.leagueUid} />
            </Stack>
          )}

          {schedule && (
            <Stack spacing={2}>
              {schedule?.eventsUtc?.map((a) => (
                <AdminEventListItem key={a.id} event={a} />
              ))}
            </Stack>
          )}
        </Stack>
      </>
    );
  };

  return loading ? renderLoadingBar() : renderContent();
}

export default AdminScheduleContainer;
