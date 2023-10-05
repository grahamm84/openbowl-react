import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Grid,
  LinearProgress,
  Card,
  Divider,
  CardHeader,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { HandshakeTwoTone } from "@mui/icons-material";

import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import AdminLeagueNavigation from "../components/AdminLeagueNavigation";
import AdminEditResultsPopup from "features/leagues/components/adminEditResultsPopup";

export default function LeagueAdminResultsContainer(props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  const dateDisplayOptions = {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "2-digit",
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let currentLeagueId = params.leagueUid;
        console.log("current league id: ", currentLeagueId);
        if (currentLeagueId) {
          const result = await api.apiGet(`results/${currentLeagueId}`);
          console.log(result);
          setResults(result.data);
          setLoading(false);
        }
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [leagueUpdated, params.leagueUid]); //monitor this state and re-call when this updates

  const resultsUpdated = () => {
    setLeagueUpdated(leagueUpdated + 1);
  };
  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const renderScores = (scores, team) => {
    console.log(scores, team);
    var players = scores
      .filter((x) => x.player.teamId === team)
      .sort((x) => x.gameNumber);

    let totalScratch = 0;
    let totalScore = 0;
    let totals = Array(players[0].games.length);
    let scratchTotals = Array(players[0].games.length);
    scratchTotals.fill(0);
    totals.fill(0);

    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < players[i].games.length; j++) {
        scratchTotals[j] = scratchTotals[j] + players[i].games[j].scratchScore;
        totalScratch = totalScratch + players[i].games[j].scratchScore;
        totals[j] = totals[j] + players[i].games[j].score;
        totalScore = totalScore + players[i].games[j].score;
      }
    }

    return (
      <Box>
        <Typography fontWeight="bold">
          {totals.toString()} ({totalScore})
        </Typography>
        <Typography noWrap variant="subtitle2">
          {scratchTotals.toString()} ({totalScratch})
        </Typography>
      </Box>
    );
  };

  return (
    <ContentContainer
      title={`League Results`}
      subtitle="Update League Results"
      icon={<HandshakeTwoTone fontSize="large" />}
      // action={renderDropdown()}
    >
      <Grid item xs={12}>
        {loading ? (
          renderLoadingBar()
        ) : (
          <Stack spacing={2} divider={<Divider />}>
            <AdminLeagueNavigation leagueId={params.leagueUid} />
            <Card mt={2}>
              <CardHeader title="League Results"></CardHeader>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Competition</TableCell>
                      <TableCell>Home Team</TableCell>
                      <TableCell>Home Team Scores</TableCell>
                      <TableCell>Away Team</TableCell>
                      <TableCell>Away Team Scores</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((result) => {
                      var date = new Date(result.eventTimeUtc);
                      {
                        /* console.log("row?", result); */
                      }
                      return (
                        <TableRow hover key={result.id}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography fontWeight="bold">
                                  {`${date.toLocaleString(
                                    undefined,
                                    dateDisplayOptions
                                  )}  @ ${date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}`}
                                </Typography>
                                <Typography noWrap variant="subtitle2">
                                  Gameweek {result.fixtureDetails.weekNumber}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Typography fontWeight="bold">League</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography fontWeight="bold">
                              {result.fixtureDetails.homeTeamName}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {renderScores(
                                result.playerGames,
                                result.fixtureDetails.homeTeamId
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Typography fontWeight="bold">
                              {result.fixtureDetails.awayTeamName}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {renderScores(
                                result.playerGames,
                                result.fixtureDetails.awayTeamId
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <AdminEditResultsPopup
                              result={result}
                              handleSaveAndClose={resultsUpdated}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Stack>
        )}
      </Grid>
    </ContentContainer>
  );
}
