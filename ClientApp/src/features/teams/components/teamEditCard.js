import { React, useState } from "react";
import * as api from "global/apiClient";
import { LoadingButton } from "@mui/lab";
import {
  CardHeader,
  Card,
  List,
  Typography,
  Divider,
  useTheme,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
  Alert,
  AlertTitle,
} from "@mui/material";
import PlayerEditFromTeamCard from "features/players/components/playerEditFromTeamCard";
import {
  BackspaceTwoTone,
  EditTwoTone,
  CheckTwoTone,
} from "@mui/icons-material";

function TeamEditCard(props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [teamActive, setTeamActive] = useState(props.team.isActive);
  const [byeTeam, setByeTeam] = useState(props.team.isByeTeam);
  const [editMode, setEditMode] = useState(false);
  const [newTeamName, setNewTeamName] = useState(props.team.teamName);

  const updateData = async () => {
    try {
      setLoading(true);
      var teamToEdit = {
        teamUid: props.team.teamUid,
        teamName: newTeamName,
        isByeTeam: byeTeam,
        isActive: teamActive,
      };
      await api.apiPost(
        `teams/${props.team.teamUid}`,
        teamToEdit,
        true,
        "Updating Team",
        "Team Updated",
        "Could not update Team"
      );
      props.refreshOnUpdate();
    } catch (err) {
      //console.error("what happened?", err); // error handling here
    }
    setLoading(false);
  };

  const handleSaveAndClose = () => {
    updateData();
    props.refreshOnUpdate();
  };

  const renderForm = (team) => {
    return (
      <Stack spacing={2} direction="column">
        <TextField
          mr={2}
          id="teamName"
          label="Team Name"
          value={newTeamName}
          onChange={(e) => {
            console.log(e.target.value);
            setNewTeamName(e.target.value);
          }}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={teamActive}
              onChange={() => setTeamActive(!teamActive)}
            />
          }
          label="Active Team"
        />

        <FormControlLabel
          control={
            <Switch checked={byeTeam} onChange={() => setByeTeam(!byeTeam)} />
          }
          label="This is the Bye Team"
        />
      </Stack>
    );
  };

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{
          p: 3,
        }}
        disableTypography
        title={
          editMode ? (
            renderForm(props.team)
          ) : (
            <Typography
              variant="h4"
              sx={{
                fontSize: `${theme.typography.pxToRem(16)}`,
              }}
            >
              {props.team.teamName}
            </Typography>
          )
        }
        action={
          <Stack direction="row" spacing={2}>
            {editMode && (
              <LoadingButton
                variant="outlined"
                loading={loading}
                startIcon={<CheckTwoTone />}
                onClick={() => {
                  console.log("this?");
                  handleSaveAndClose();
                }}
              >
                Save
              </LoadingButton>
            )}
            <LoadingButton
              variant="text"
              startIcon={editMode ? <BackspaceTwoTone /> : <EditTwoTone />}
              loading={loading}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </LoadingButton>
          </Stack>
        }
      />
      <Divider />
      {byeTeam && (
        <Alert severity="info">
          <AlertTitle>Bye Team</AlertTitle>
          This team is your bye team and will ensure all teams play each
          schedule
        </Alert>
      )}

      {!byeTeam && (
        <List
          sx={{
            py: 0,
          }}
        >
          {props.team.players?.map((item) => (
            <PlayerEditFromTeamCard
              player={item}
              key={item.id}
              refreshOnUpdate={props.refreshOnUpdate}
            />
          ))}
        </List>
      )}
    </Card>
  );
}

export default TeamEditCard;
