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
  Chip,
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

export default function SingleFixtureInProgressDetailsSection(props) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dupes, setDupes] = useState(false);
  const [fixtureList, setFixtureList] = useState();
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  console.log("details: ", props.selectedFixture);
  return (
    <Card>
      <CardHeader
        title={`${
          props.selectedFixture?.competitions.filter(
            (x) => x.competitionTypeId === 1
          )[0].competitionName
        } Matches - Week ${props.selectedFixture?.fixtures[0].weekNumber}`}
      />

      <CardContent>
        {props.selectedFixture?.fixtures
          .filter((x) => x.competitionTypeId === 1)
          .map((f) => (
            <Grid container spacing={2} m={1} key={`fixture-${f.id}`}>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h4">
                  {f.homeTeamName}{" "}
                </Typography>
                {f.homeTeamPlayerScores.map((p, index) => (
                  <Typography
                    variant="subtitle2"
                    key={`homePlayer-${index}`}
                    noWrap
                  >
                    {p.player.displayName} | ({p.scores.totalScratch},{" "}
                    {p.scores.total})
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h3" key={`vs-label-${f.id}`}>
                  <Chip
                    size="small"
                    label={f.homeTeamScores.total}
                    color="primary"
                  />{" "}
                  vs{" "}
                  <Chip
                    size="small"
                    label={f.awayTeamScores.total}
                    color="primary"
                  />
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h4">
                  {f.awayTeamName}{" "}
                </Typography>
                {f.awayTeamPlayerScores.map((a, index) => (
                  <Typography
                    variant="subtitle2"
                    key={`awayPlayer-${index}`}
                    noWrap
                  >
                    {a.player.displayName} | ({a.scores.totalScratch},{" "}
                    {a.scores.total})
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={5} />
            </Grid>
          ))}
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
}
