import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Alert,
  Button,
  Grid,
  LinearProgress,
  MenuItem,
  Card,
  Select,
  Divider,
  Stack,
  CardHeader,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Box,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import {
  CheckCircleOutlineTwoTone,
  DoNotDisturbAltTwoTone,
  HandshakeTwoTone,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import AdminLeagueNavigation from "../components/AdminLeagueNavigation";
import { LoadingButton } from "@mui/lab";
import SwitchFixturesPopup from "../components/switchFixturesPopup";
import { SwitchLeftTwoTone } from "@mui/icons-material";
import SingleFixtureInProgressActions from "../components/SingleFixtureInProgressActions";
import SingleFixtureInProgressDetailsSection from "../components/SingleFixtureInProgressDetailsSection";

export default function LeagueAdminSingleFixtureContainer() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dupes, setDupes] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState();
  const [fixtureList, setFixtureList] = useState();
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let currentLeagueId = params.leagueUid;
        let currentFixtureId = params.fixtureId;
        console.log(
          "current league id: ",
          currentLeagueId,
          " and fixture Id: ",
          currentFixtureId
        );
        if (currentLeagueId) {
          const result = await api.apiGet(
            `fixture-admin?leagueId=${currentLeagueId}&scheduleEventId=${currentFixtureId}`
          );
          console.log("big result", result);
          setSelectedFixture(result.data);
          let newFixtures = [];
          result.data.fixtures.map((fixture) => {
            let newFixture = {
              homeTeamUid: fixture.homeTeamUid,
              awayTeamUid: fixture.awayTeamUid,
              id: fixture.id,
              competitionTypeId: fixture.competitionTypeId,
            };
            newFixtures.push(newFixture);
          });

          setFixtureList(newFixtures);

          setLoading(false);
        }
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [leagueUpdated]); //monitor this state and re-call when this updates

  const handleFixtureSwitch = () => {
    setLeagueUpdated(leagueUpdated + 1);
  };
  const updateLeagueMatch = (fixture, newValue, homeTeam) => {
    //console.log(fixture, newValue, homeTeam);
    console.log("before", fixtureList);
    let newFixture = fixture;
    if (homeTeam) {
      newFixture.homeTeamUid = newValue;
    } else {
      newFixture.awayTeamUid = newValue;
    }

    const newFixtures = fixtureList.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.id === fixture.id) {
        return {
          ...obj,
          homeTeamUid: newFixture.homeTeamUid,
          awayTeamUid: newFixture.awayTeamUid,
        };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });
    //console.log("new fixtures?", newFixtures);
    setFixtureList(newFixtures);
    checkForDupes();
    //console.log("after", fixtureList);
  };

  const updateFixtures = async () => {
    console.log("updating fixtures", fixtureList);
    console.log(fixtureList);

    const toUpdate = {
      LeagueId: params.leagueUid,
      Fixtures: fixtureList,
    };

    console.log("update model:", toUpdate);
    try {
      await api.apiPost(
        `fixture-admin/${params.leagueUid}`,
        toUpdate,
        true,
        "Updating Fixtures",
        "Fixtures Updated",
        "Could not update Fixtures"
      );
    } catch (err) {
      console.error("error:", err); // error handling here
    }
    setLoading(false);
  };

  const checkForDupes = () => {
    let teamList = [];
    let dupeFound = false;

    fixtureList.map((fixture) => {
      if (teamList.includes(fixture.homeTeamUid)) {
        dupeFound = true;
      } else {
        teamList.push(fixture.homeTeamUid);
      }

      if (teamList.includes(fixture.awayTeamUid)) {
        dupeFound = true;
      } else {
        teamList.push(fixture.awayTeamUid);
      }
    });

    setDupes(dupeFound);
  };

  const renderExtraFixtures = () => {
    let components = [];

    var x = selectedFixture.fixtures.map((fixture) => {
      return fixture.competitionId;
    });
    let distinctCompetitions = new Set(x);
    console.log("distinctCompetitions", distinctCompetitions);

    distinctCompetitions.forEach((competitionId) => {
      let comp = selectedFixture.competitions.filter(
        (x) => x.id === competitionId
      )[0];
      if (comp?.competitionTypeId === 1) {
        components.push(
          <Card key={`card-comp-${competitionId}`}>
            <CardHeader title="League Fixture Actions"></CardHeader>
            <CardContent>
              <Stack spacing={1} divider={<Divider />} direction="row">
                {selectedFixture.weekStatus !== 0 && (
                  <SingleFixtureInProgressActions />
                )}

                {selectedFixture.weekStatus === 0 && (
                  <>
                    <SwitchFixturesPopup
                      fixture={selectedFixture}
                      competitionId={competitionId}
                      handleSaveAndClose={handleFixtureSwitch}
                      currentGameweek={selectedFixture?.fixtures[0].weekNumber}
                    />

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DoNotDisturbAltTwoTone />}
                    >
                      No Bowling This Session
                    </Button>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        );
      } else {
        components.push(
          <Card key={`card-comp-${competitionId}`}>
            <CardHeader title="Other Competition Fixture Actions"></CardHeader>
            <CardContent>
              <Stack spacing={1} divider={<Divider />} direction="row"></Stack>
            </CardContent>
          </Card>
        );
      }
    });

    return components;
  };
  return (
    <ContentContainer
      title={`Competitions & Fixtures - Edit Fixture`}
      subtitle={`Edit Fixture Week ${selectedFixture?.fixtures[0].weekNumber}`}
      icon={<HandshakeTwoTone fontSize="large" />}
      // action={renderDropdown()}
    >
      <Grid item xs={12}>
        {loading && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        )}
        {!loading && (
          <Grid item xs={12}>
            {fixtureList && (
              <>
                <Stack spacing={2} divider={<Divider />}>
                  <AdminLeagueNavigation leagueId={params.leagueUid} />
                  {renderExtraFixtures()}
                </Stack>

                <Grid container m={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Details</Typography>
                  </Grid>
                </Grid>

                <Stack spacing={2} divider={<Divider />}>
                  {selectedFixture?.weekStatus !== 0 && (
                    <SingleFixtureInProgressDetailsSection
                      selectedFixture={selectedFixture}
                    />
                  )}
                  {selectedFixture?.weekStatus === 0 && (
                    <>
                      <Alert severity="info">
                        It is not recommended to manually update the league
                        fixtures as this will cause an unbalanced head to head
                        list. You can switch unplayed gameweeks around from the
                        competitions and fixtures screen
                      </Alert>

                      <Card>
                        <CardHeader
                          title={`${
                            selectedFixture?.competitions.filter(
                              (x) => x.competitionTypeId === 1
                            )[0].competitionName
                          } Matches - Week ${
                            selectedFixture?.fixtures[0].weekNumber
                          }`}
                        />

                        <CardContent>
                          {fixtureList
                            .filter((x) => x.competitionTypeId === 1)
                            .map((f) => (
                              <Grid
                                container
                                spacing={2}
                                m={1}
                                key={`fixture-${f.id}`}
                              >
                                <Grid item xs={3}>
                                  <Select
                                    disabled={!editMode}
                                    fullWidth
                                    key={`fixture-select-${f.id}`}
                                    value={f.homeTeamUid}
                                    onChange={(e) =>
                                      updateLeagueMatch(f, e.target.value, true)
                                    }
                                  >
                                    {selectedFixture.availableTeams?.map(
                                      (t) => (
                                        <MenuItem
                                          key={`team-select-${t.teamUid}`}
                                          value={t.teamUid}
                                        >
                                          {t.teamName}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </Grid>
                                <Grid item xs={1}>
                                  <Typography
                                    variant="h3"
                                    key={`vs-label-${f.id}`}
                                  >
                                    {" "}
                                    vs{" "}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Select
                                    fullWidth
                                    disabled={!editMode}
                                    key={`fixture-select-away-${f.id}`}
                                    value={f.awayTeamUid}
                                    onChange={(e) =>
                                      updateLeagueMatch(
                                        f,
                                        e.target.value,
                                        false
                                      )
                                    }
                                  >
                                    {selectedFixture.availableTeams?.map(
                                      (t) => (
                                        <MenuItem
                                          key={`team-select-away-${t.teamUid}`}
                                          value={t.teamUid}
                                        >
                                          {t.teamName}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </Grid>
                                <Grid item xs={5} />
                              </Grid>
                            ))}

                          {dupes && (
                            <Alert severity="error">
                              You have duplicate teams in your fixtures. Please
                              check and try again
                            </Alert>
                          )}
                        </CardContent>

                        <CardActions>
                          <Box m={1}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={editMode}
                                  onChange={() => setEditMode(!editMode)}
                                />
                              }
                              label="Edit League Fixtures"
                            />
                          </Box>
                          <Box m={1}>
                            <LoadingButton
                              disabled={!editMode || dupes}
                              variant="contained"
                              onClick={updateFixtures}
                              loading={loading}
                              color="primary"
                            >
                              Update Fixtures
                            </LoadingButton>
                          </Box>
                        </CardActions>
                      </Card>
                    </>
                  )}
                </Stack>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </ContentContainer>
  );
}
