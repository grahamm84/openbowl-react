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
} from "@mui/material";
import { SwitchAccountTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Label from "global/components/Label";

export const SelectedAdminLeagueContext = React.createContext({});

export default function AdminLeagueSelector() {
  const [open, setOpen] = React.useState(false);
  const [availableAdminLeagues, setAvailableAdminLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAdminLeague, setSelectedAdminLeague] = useState(null);
  const [activeAdminLeague, setActiveAdminLeague] = useState(null);

  const updateActiveAdminLeague = (selectedAdminLeague) => {
    storage.saveSelectedAdminLeague(JSON.stringify(selectedAdminLeague));
    setActiveAdminLeague(selectedAdminLeague);
    //window.location.reload(true);
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet("my-leagues/admin");
        setAvailableAdminLeagues(result.data);
        console.log("result.data: ", result.data);
        console.log("result.data length: ", result.data.length);
        if (result.data.length === 1) {
          updateActiveAdminLeague(result.data);
        }
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    var savedAdminLeagueSelection = storage.getSelectedAdminLeague();
    if (savedAdminLeagueSelection != null) {
      setSelectedAdminLeague(savedAdminLeagueSelection);
      updateActiveAdminLeague(savedAdminLeagueSelection);
    }

    fetchData();
  }, []);

  const handleChange = (event, value) => {
    setSelectedAdminLeague(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = () => {
    console.log("what is the selectedAdminLeague: ", selectedAdminLeague);
    setLoading(true);
    updateActiveAdminLeague(selectedAdminLeague);
    //handleClose();
    window.location.assign("league-admin");
  };

  const renderAdminLeagueSelector = () => {
    if (loading) {
      return <Skeleton />;
    } else {
      return (
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            disableClearable={true}
            id="adminLeague-selection-dropdown"
            options={availableAdminLeagues}
            name="name"
            loading={loading}
            value={selectedAdminLeague}
            onChange={handleChange}
            getOptionLabel={(option) => option.leagueName}
            //style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="League Selection" />
            )}
          />
        </FormControl>
      );
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <Grid item xs={10}>
        {activeAdminLeague ? (
          <Label color="primary">{activeAdminLeague.leagueName}</Label>
        ) : (
          <Label>Select a League</Label>
        )}
      </Grid>

      <Grid item xs={2}>
        <Tooltip title="Click to Select a AdminLeague" arrow>
          <SwitchAccountTwoTone color="secondary" onClick={handleClickOpen} />
        </Tooltip>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle>League Selection</DialogTitle>
          <DialogContent>
            <DialogContentText>Select an available League</DialogContentText>
            <Box mt={1}>{renderAdminLeagueSelector()}</Box>
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
      </Grid>
      {/* <Typography variant="caption" onClick={handleClickOpen}>
        Change AdminLeague
      </Typography> */}
    </Grid>
  );
}
