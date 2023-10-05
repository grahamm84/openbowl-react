import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Tooltip,
  Box,
  Table,
  TableRow,
  Typography,
  IconButton,
  Stack,
  Divider,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
} from "@mui/material";
import { EditTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as api from "global/apiClient";

export default function AdminEditResultsPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    setFixtures(props.result.playerGames);
  }, [updates]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = async () => {
    setLoading(true);
    console.log("Saving:", fixtures);
    console.log("Saving:", props.result.fixtureId);

    const toUpdate = {
      fixtureId: props.result.fixtureId,
      toUpdate: fixtures,
    };

    console.log("update model:", toUpdate);
    try {
      await api.apiPost(
        `results/update-results`,
        toUpdate,
        true,
        "Updating Results",
        "Results Updated",
        "Could not update Results"
      );
    } catch (err) {
      console.error("error:", err); // error handling here
    }
    setLoading(false);
    props.handleSaveAndClose();
    handleClose();
  };

  const updateData = (e, gameNumber, player, teamId) => {
    let currentFixtures = fixtures;
    let playerData = currentFixtures.find((x) => x.player.id === player.id);
    if (
      playerData?.games[gameNumber - 1].scratchScore !==
      parseInt(e.target.valuem, 10)
    ) {
      playerData.games[gameNumber - 1].scratchScore = parseInt(
        e.target.value,
        10
      );
      setFixtures(currentFixtures);
      setUpdates(updates + 1);
    }
  };

  const renderPlayerRow = (teamId) => {
    let components = [];
    let currentComponents = [];
    let teamTotalHandicap = 0;
    let teamTotalScratch = 0;
    let teamTotal = 0;

    fixtures
      .filter((x) => x.player.teamId === teamId)
      .map((p) => {
        currentComponents.push(<TableCell>{p.player.displayName}</TableCell>);
        let games = p.games.sort((x) => x.gameNumber);
        const playerHandicap = games[0]?.handicap;
        teamTotalHandicap = teamTotalHandicap + playerHandicap;
        currentComponents.push(<TableCell>{playerHandicap}</TableCell>);

        let scratchTotal = 0;
        let totalScore = 0;

        games.map((g) => {
          scratchTotal = scratchTotal + g.scratchScore;
          totalScore = totalScore + g.scratchScore + g.handicap;

          teamTotalScratch = teamTotalScratch + g.scratchScore;
          teamTotal = teamTotal + g.score;

          //todo: add some validation on the numbers here.
          currentComponents.push(
            <TableCell>
              <TextField
                size="small"
                type="number"
                max={300}
                defaultValue={g.scratchScore}
                onChange={(e) => updateData(e, g.gameNumber, p.player, teamId)}
              />
            </TableCell>
          );
        });

        currentComponents.push(<TableCell>{scratchTotal}</TableCell>);
        currentComponents.push(<TableCell>{totalScore}</TableCell>);
        components.push(<TableRow>{currentComponents}</TableRow>);
        currentComponents = [];
      });

    return <>{components}</>;
  };

  const renderTotalsRows = (teamId) => {
    let totals = Array(gameCount);
    totals.fill(0);

    let playersInTeam = fixtures.filter((x) => x.player.teamId === teamId);
    let components = [];
    let currentComponents = [];

    currentComponents.push(
      <>
        <TableCell>Total</TableCell>
        <TableCell></TableCell>
      </>
    );

    let totalHandicaps = 0;
    playersInTeam.map((p) => {
      for (let i = 0; i < gameCount; i++) {
        if (i === 0) {
          totalHandicaps = totalHandicaps + p.games[i].handicap;
        }
        totals[i] = totals[i] + p.games[i].scratchScore;
      }
    });

    var runningTotal = 0;
    for (let i = 0; i < gameCount; i++) {
      runningTotal = runningTotal + totals[i];
      currentComponents.push(
        <TableCell>
          <Typography variant="h6">{totals[i]}</Typography>
        </TableCell>
      );
    }

    currentComponents.push(
      <TableCell>
        <Typography variant="h6">{runningTotal}</Typography>
      </TableCell>
    );

    components.push(<TableRow>{currentComponents}</TableRow>);
    currentComponents = [];

    components.push(
      <TableRow>
        <TableCell>Total Handicap</TableCell>
        <TableCell></TableCell>
        <TableCell>{totalHandicaps}</TableCell>
        <TableCell>{totalHandicaps}</TableCell>
        <TableCell>{totalHandicaps}</TableCell>
      </TableRow>
    );

    currentComponents.push(
      <>
        <TableCell variant="head">Total Scores</TableCell>
        <TableCell></TableCell>
      </>
    );

    let totalRunning = 0;
    for (let i = 0; i < gameCount; i++) {
      let gameTotal = totals[i] + totalHandicaps;
      totalRunning = totalRunning + gameTotal;
      currentComponents.push(
        <TableCell>
          <Typography variant="h6">{gameTotal}</Typography>
        </TableCell>
      );
    }

    currentComponents.push(
      <>
        <TableCell></TableCell>
        <TableCell>
          <Typography variant="h5">{totalRunning}</Typography>
        </TableCell>
      </>
    );

    components.push(<TableRow>{currentComponents}</TableRow>);
    return <>{components}</>;
  };

  //console.log("result", props.result);
  let gameNumbers = props.result?.playerGames[0]?.games?.map((game) => {
    return game.gameNumber;
  });
  let gameCount = Math.max.apply(null, gameNumbers);

  const rowHeaders = [];
  for (let i = 0; i < gameCount; i++) {
    rowHeaders.push(
      <TableCell key={i} align="left">
        Game {i + 1}
      </TableCell>
    );
  }

  return (
    <>
      <Typography noWrap>
        <Tooltip title={"Manage"} arrow>
          <IconButton color="primary" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <DialogTitle>Edit Results</DialogTitle>
        <DialogContent>
          <DialogContentText>Fixture Details here:</DialogContentText>
          <Box p={2}>
            <Typography variant="h2">
              {props.result.fixtureDetails.homeTeamName}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Player</TableCell>
                    <TableCell align="left">Handicap</TableCell>
                    {rowHeaders}
                    <TableCell align="left">Scratch</TableCell>
                    <TableCell align="left">Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderPlayerRow(props.result.fixtureDetails.homeTeamId)}
                </TableBody>
                <TableFooter>
                  {renderTotalsRows(props.result.fixtureDetails.homeTeamId)}
                </TableFooter>
              </Table>
            </Stack>
          </Stack>

          <Divider />

          <Box p={2}>
            <Typography variant="h2">
              {props.result.fixtureDetails.awayTeamName}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Player</TableCell>
                    <TableCell align="left">Handicap</TableCell>
                    {rowHeaders}
                    <TableCell align="left">Scratch</TableCell>
                    <TableCell align="left">Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderPlayerRow(props.result.fixtureDetails.awayTeamId)}
                </TableBody>
                <TableFooter>
                  {renderTotalsRows(props.result.fixtureDetails.awayTeamId)}
                </TableFooter>
              </Table>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleSaveAndClose} loading={loading}>
            Save Scores
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
