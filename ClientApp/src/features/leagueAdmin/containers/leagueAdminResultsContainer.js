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
  CardHeader,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { EditTwoTone, HandshakeTwoTone } from "@mui/icons-material";

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
import FixtureCreatePopup from "features/leagues/components/adminEditResultsPopup";

export default function LeagueAdminResultsContainer(props) {
  const [loading, setLoading] = useState(false);
  const [availableLeagues, setAvailableLeagues] = useState();
  const [selectedLeague, setSelectedLeague] = useState();
  const [leagueUid, setLeagueUid] = useState("");
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const handleAccordChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
          setSelectedLeague(result.data);
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
        <Stack spacing={2} divider={<Divider />}>
          {selectedLeague && (
            <>
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
                      <TableRow hover>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Typography fontWeight="bold">
                                Date Here
                              </Typography>
                              <Typography noWrap variant="subtitle2">
                                Week Number
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Typography fontWeight="bold">League</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography fontWeight="bold">Home Team</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Typography fontWeight="bold">
                                125, 150, 175 (432)
                              </Typography>
                              <Typography noWrap variant="subtitle2">
                                100, 125, 150 (400)
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Typography fontWeight="bold">Away Team</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Typography fontWeight="bold">
                                125, 150, 175 (432)
                              </Typography>
                              <Typography noWrap variant="subtitle2">
                                100, 125, 150 (400)
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <FixtureCreatePopup />
                          {/* <Typography noWrap>
                            <Tooltip title={"Manage"} arrow>
                              <IconButton color="primary">
                                <EditTwoTone fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography> */}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}
        </Stack>
      </>
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
        {loading ? renderLoadingBar() : renderContent()}
      </Grid>
    </ContentContainer>
  );
}
