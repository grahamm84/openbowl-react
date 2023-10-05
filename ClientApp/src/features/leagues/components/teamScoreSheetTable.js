import * as React from "react";
import {
  Box,
  Table,
  TableRow,
  Typography,
  Stack,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function TeamScoreSheetTable(props) {
  const numberOfFixtures = props.fixtures?.length ?? 0;
  const renderGameRows = () => {
    let rows = [];
    for (let i = 0; i < numberOfFixtures; i++) {
      rows.push(
        <TableCell key={i} align="left">
          Game {i + 1}
        </TableCell>
      );
    }
    return rows;
  };

  const renderScores = () => {
    let rows = [];
    for (let i = 0; i < numberOfFixtures; i++) {
      rows.push(
        <TableCell>
          <ListItem>
            <ListItemText primary="145" secondary="175" />
          </ListItem>
        </TableCell>
      );
    }
    return rows;
  };

  return (
    <>
      <Box p={2}>
        <Typography variant="h2">{props.teamName}</Typography>
      </Box>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Player</TableCell>
                <TableCell align="left">Handicap</TableCell>
                {renderGameRows()}
                <TableCell align="left">Scratch</TableCell>
                <TableCell align="left">Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.players?.map((player) => (
                <TableRow key={`teamCard-player-${player.playerUid}`}>
                  <TableCell>{player.displayName}</TableCell>
                  <TableCell>{player.handicap}</TableCell>
                  {renderScores()}
                  <TableCell>400</TableCell>
                  <TableCell>510</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Handicap</TableCell>
                <TableCell></TableCell>
                <TableCell>99</TableCell>
                <TableCell>99</TableCell>
                <TableCell>99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Total Scores</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">289</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h5">1289</Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Stack>
      </Stack>
    </>
  );
}
