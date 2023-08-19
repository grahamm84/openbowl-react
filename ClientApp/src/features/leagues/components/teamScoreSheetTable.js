import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as api from "global/apiClient";
import * as storage from "global/helpers/storageService";
import {
  FormControl,
  Grid,
  Skeleton,
  Tooltip,
  Autocomplete,
  Box,
  MenuItem,
  Select,
  Table,
  TableRow,
  DataGrid,
  Typography,
  IconButton,
  Stack,
  Divider,
  TableHead,
  Tab,
  TableCell,
  TableBody,
  TableFooter,
  ListItem,
  ListItemText,
  Badge,
  Chip,
} from "@mui/material";
import {
  EditTwoTone,
  RowingSharp,
  SwitchAccountTwoTone,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Label from "global/components/Label";

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
