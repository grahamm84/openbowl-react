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
import { EditTwoTone, SwitchAccountTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Label from "global/components/Label";

export default function AdminEditResultsPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usedTeams, setUsedTeams] = useState([]); // [team1, team2
  const [fixtures, setFixtures] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = () => {
    setLoading(true);
    //updateActiveAdminLeague(selectedAdminLeague);
    handleClose();
    //window.location.assign("league-admin");
  };

  console.log("fixtures", fixtures);
  return (
    <>
      <Typography noWrap>
        <Tooltip title={"Manage"} arrow>
          <IconButton color="primary" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Edit Results</DialogTitle>
        <DialogContent>
          <DialogContentText>Fixture Details here:</DialogContentText>
          <Box p={2}>
            <Typography variant="h2">Team 1</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Player</TableCell>
                    <TableCell align="left">Handicap</TableCell>
                    <TableCell align="left">Game 1</TableCell>
                    <TableCell align="left">Game 2</TableCell>
                    <TableCell align="left">Game 3</TableCell>
                    <TableCell align="left">Scratch</TableCell>
                    <TableCell align="left">Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Adam</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>510</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Graham</TableCell>
                    <TableCell>70</TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>
                      <ListItem>
                        <ListItemText primary="145" secondary="175" />
                      </ListItem>
                    </TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>510</TableCell>
                  </TableRow>
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

          <Divider />
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleSaveAndClose} loading={loading}>
            Set League
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
