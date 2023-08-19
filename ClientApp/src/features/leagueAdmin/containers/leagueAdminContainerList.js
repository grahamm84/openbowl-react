import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Alert,
  Grid,
  LinearProgress,
  Card,
  Divider,
  Box,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link, useParams, RouterLink, useNavigate } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import {
  HandshakeTwoTone,
  LaunchTwoTone,
  SearchTwoTone,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import AdminLeagueSelector from "../components/AdminLeagueSelector";

export default function LeagueAdminContainerList() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [availableLeagues, setAvailableLeagues] = useState();
  const [selectedLeague, setSelectedLeague] = useState();
  const [leagueUid, setLeagueUid] = useState("");
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet("my-leagues/admin");
        setAvailableLeagues(result.data);
        console.log("result.data: ", result.data);
        console.log("result.data length: ", result.data.length);
        if (result.data.length === 1) {
          navigateToLeague(result.data.leagueUid);
        }
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

  const navigateToLeague = (leagueUid) => {
    console.log("navigateToLeague: ", leagueUid);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const renderContent = () => {
    return (
      <>
        <Grid item xs={12}>
          {availableLeagues && availableLeagues.length > 0 && (
            <Card>
              {availableLeagues.length === 0 ? (
                <>
                  <Typography
                    sx={{
                      py: 10,
                    }}
                    variant="h3"
                    fontWeight="normal"
                    color="text.secondary"
                    align="center"
                  >
                    No Leagues Found with those filters
                  </Typography>
                </>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>League Name</TableCell>
                          <TableCell>Players Per Team</TableCell>
                          <TableCell>Team Count</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {availableLeagues.map((league) => {
                          return (
                            <TableRow hover key={league.leagueUid}>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Box>
                                    <Typography fontWeight="bold">
                                      {league.leagueName}
                                    </Typography>
                                    <Typography noWrap variant="subtitle2">
                                      {league.leagueIntroduction}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="left">
                                <Typography fontWeight="bold">
                                  {league.playersPerTeam}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography fontWeight="bold">
                                  {league.startingTeams}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>placeholder</Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Typography noWrap>
                                  <Tooltip title={"Manage"} arrow>
                                    <IconButton
                                      component={Link}
                                      to={`${league.leagueUid}/`}
                                      color="primary"
                                    >
                                      <LaunchTwoTone fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Card>
          )}

          {!availableLeagues && renderNoLeagues()}
        </Grid>
      </>
    );
  };

  const renderNoLeagues = () => {
    return (
      <Alert severity="warning">
        You are not an admin of any leagues. Please contact your league admin to
        be added or create a new league
      </Alert>
    );
  };

  return (
    <ContentContainer
      title={"League Administration"}
      subtitle="Manage your bowling leagues"
      icon={<HandshakeTwoTone fontSize="large" />}
      // action={renderDropdown()}
      action={<AdminLeagueSelector />}
    >
      <Grid item xs={12}>
        {loading ? renderLoadingBar() : renderContent()}
      </Grid>
    </ContentContainer>
  );
}
