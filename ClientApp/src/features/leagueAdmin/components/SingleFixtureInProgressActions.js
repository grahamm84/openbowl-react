import { React, useState } from "react";
import { Alert, Button, Divider, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  CheckCircleOutlineTwoTone,
  DeleteForeverTwoTone,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function SingleFixtureInProgressActions() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dupes, setDupes] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState();
  const [fixtureList, setFixtureList] = useState();
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  return (
    <>
      <Stack spacing={1} divider={<Divider />} direction="column">
        <Alert severity="warning">
          Can not switch an in-progress or completed week
        </Alert>

        <Stack spacing={1} divider={<Divider />} direction="row">
          <Button
            variant="outlined"
            color="success"
            startIcon={<CheckCircleOutlineTwoTone />}
          >
            Mark As Played
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverTwoTone />}
          >
            Reset Week (Including Scores)
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
