import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Card,
  Select,
  SelectChangeEvent,
  Divider,
  styled,
  Stack,
  CardHeader,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { HandshakeTwoTone } from "@mui/icons-material";

import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeagueDetailsTabMenu from "../../leagues/components/leagueDetailsTabMenu";
import CreateLeagueForm from "features/leagues/components/editLeagueForm";
import EditLeagueForm from "features/leagues/components/editLeagueForm";
import AdminLeagueSelector from "../components/AdminLeagueSelector";
import * as storage from "global/helpers/storageService";
import TeamListCard from "features/teams/components/teamEditCard";
import TeamEditCard from "features/teams/components/teamEditCard";
import AdminTeamContainer from "features/teams/containers/adminTeamContainer";
import AdminScheduleContainer from "features/fixtures/containers/adminScheduleContainer";
import AdminLeagueNavigation from "../components/AdminLeagueNavigation";
import { LoadingButton } from "@mui/lab";

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

  const updateFixtures = () => {
    console.log(fixtureList);
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

                  <Alert severity="info">
                    It is not recommended to manually update the league fixtures
                    as this will cause an unbalanced head to head list. You can
                    switch unplayed gameweeks around from the competitions and
                    fixtures screen
                  </Alert>
                </Stack>

                <Stack spacing={2}>
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
                                {selectedFixture.availableTeams?.map((t) => (
                                  <MenuItem
                                    key={`team-select-${t.teamUid}`}
                                    value={t.teamUid}
                                  >
                                    {t.teamName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography variant="h3" key={`vs-label-${f.id}`}>
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
                                  updateLeagueMatch(f, e.target.value, false)
                                }
                              >
                                {selectedFixture.availableTeams?.map((t) => (
                                  <MenuItem
                                    key={`team-select-away-${t.teamUid}`}
                                    value={t.teamUid}
                                  >
                                    {t.teamName}
                                  </MenuItem>
                                ))}
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
                </Stack>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </ContentContainer>
  );
}
