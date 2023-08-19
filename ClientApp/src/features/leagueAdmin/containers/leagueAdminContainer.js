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

export default function LeagueAdminContainer(props) {
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
          const result = await api.apiGet(`leagues/${currentLeagueId}`);
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
                <CardHeader title="League Settings">
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    General settings
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    General League Settings
                  </Typography>
                </CardHeader>
                <EditLeagueForm selectedLeague={selectedLeague} />
              </Card>
            </>
          )}
          {!availableLeagues && renderNoLeagues()}
        </Stack>
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
      title={`League Settings`}
      subtitle="Manage your league settings"
      icon={<HandshakeTwoTone fontSize="large" />}
      // action={renderDropdown()}
    >
      <Grid item xs={12}>
        {loading ? renderLoadingBar() : renderContent()}
      </Grid>
    </ContentContainer>
  );
}
