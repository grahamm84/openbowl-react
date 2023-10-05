import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Tooltip,
  Box,
  Typography,
  Stack,
  Button,
  ListItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SwitchLeftTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as api from "global/apiClient";
import { useParams } from "react-router-dom";

export default function SwitchFixturesPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [fixture, setFixture] = useState();
  const [availableForSwitch, setAvailableForSwitch] = useState([]);
  const [updates, setUpdates] = useState(0);
  const params = useParams();
  const [switchFixture, setSwitchFixture] = useState();

  const dateDisplayOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    setLoading(true);
    setFixture(props.fixture);
    const fetchData = async () => {
      try {
        let currentLeagueId = params.leagueUid;
        console.log(
          "current league id: ",
          currentLeagueId,
          props.competitionId
        );
        if (currentLeagueId) {
          const result = await api.apiPost(
            `fixture-admin/${currentLeagueId}/available-for-switch`,
            {
              competitionId: props.competitionId,
              leagueId: currentLeagueId,
              currentGameweek: props.currentGameweek,
            }
          );
          console.log("available for switch", result);
          setAvailableForSwitch(result.data);
          setLoading(false);
        }
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [updates]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = async () => {
    setLoading(true);
    console.log("Updating Fixture:", fixture);

    const toUpdate = {
      LeagueId: params.leagueUid,
      OriginalEventScheduleId: fixture.fixtures[0].scheduleEventId,
      SwitchWithEventScheduleId: switchFixture.id,
    };

    console.log("update model:", toUpdate);
    try {
      await api.apiPost(
        `fixture-admin/${params.leagueUid}/switch`,
        toUpdate,
        true,
        "Switching Fixtures",
        "Fixtures Switched",
        "Could not update Fixtures"
      );
    } catch (err) {
      console.error("error:", err); // error handling here
    }
    setLoading(false);
    props.handleSaveAndClose();
    handleClose();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSwitchFixture(
      availableForSwitch?.eventsUtc.filter(
        (x) => x.id === event.target.value
      )[0]
    );
  };

  const renderWeeksDropdown = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Fixture Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Fixture Select"
          onChange={handleChange}
        >
          {availableForSwitch?.eventsUtc?.map((f, index) => {
            var date = new Date(`${f.eventTimeUtc}Z`);
            return (
              <MenuItem key={index} value={f.id}>
                Week {f.fixtures[0].weekNumber} -{" "}
                {date.toLocaleTimeString(undefined, dateDisplayOptions)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Typography noWrap>
        <Tooltip title={"Switch fixtures with another week's fixtures"} arrow>
          <Button
            variant="outlined"
            startIcon={<SwitchLeftTwoTone />}
            onClick={handleClickOpen}
          >
            Switch Fixtures
          </Button>
        </Tooltip>
      </Typography>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Switch Fixtures</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Switch this week's fixtures with another week
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5">Existing Fixtures</Typography>
              <Box p={2}>
                {fixture?.fixtures.map((f, index) => (
                  <ListItem key={`fixture-${f.id}-${index}`}>
                    {f.homeTeamName} vs {f.awayTeamName}
                  </ListItem>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Switch With</Typography>
              {renderWeeksDropdown()}
              <Typography variant="h5">Proposed Fixtures</Typography>
              <Box p={2}>
                <Box p={2}>
                  {switchFixture?.fixtures.map((f, index) => (
                    <ListItem key={`fixture-${f.id}-${index}`}>
                      {f.homeTeamName} vs {f.awayTeamName}
                    </ListItem>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={2}></Stack>
            </Stack>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleSaveAndClose} loading={loading}>
            Change Fixtures
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
