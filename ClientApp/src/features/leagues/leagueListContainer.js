import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Button,
  Grid,
  LinearProgress,
  Typography,
  Drawer,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { AddTwoTone, HandshakeTwoTone } from "@mui/icons-material";
import LeagueAddCard from "./components/leagueAddCard";
import CreateLeagueDrawer from "./components/createLeagueDrawer";

export default function LeagueListContainer() {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leagues, setLeagues] = useState([{}]);
  const [leaguesUpdated, setLeaguesUpdated] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet(`my-leagues`);
        console.log(result);
        setLeagues(result.data);
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [leaguesUpdated]); //monitor this state and re-call when this updates

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const closeDrawer = () => {
    console.log("close drawer");
    setDrawerOpen(false);
  };

  const closeDrawerAndSave = () => {
    console.log("close drawer and save");
    setLeaguesUpdated(setLeaguesUpdated + 1);
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    console.log("open drawer");
    setDrawerOpen(true);
  };

  const renderLeagueList = () => {
    return leagues.map((league, index) => {
      return (
        <Typography key={index} variant="h5">
          {league.leagueName}
        </Typography>
      );
    });
  };

  return (
    <ContentContainer
      title="My Leagues"
      subtitle="View and Manage leagues"
      icon={<HandshakeTwoTone fontSize="large" />}
      action={
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddTwoTone fontSize="large" />}
          onClick={(e) => openDrawer()}
        >
          Add League
        </Button>
      }
    >
      {loading ? renderLoadingBar() : renderLeagueList()}
      <LeagueAddCard onClick={openDrawer} />

      <Drawer
        PaperProps={{
          sx: { width: "45%" },
        }}
        variant="temporary"
        anchor="right"
        onClose={closeDrawer}
        open={drawerOpen}
        elevation={9}
      >
        {drawerOpen && (
          <CreateLeagueDrawer
            close={closeDrawer}
            saveAndClose={closeDrawerAndSave}
          />
        )}
      </Drawer>
    </ContentContainer>
  );
}
