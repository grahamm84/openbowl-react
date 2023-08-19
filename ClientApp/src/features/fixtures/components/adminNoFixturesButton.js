import * as React from "react";
import { useState, useEffect } from "react";
import * as api from "global/apiClient";
import { Button, Typography, Box, styled, Avatar } from "@mui/material";

import InsertInvitationTwoToneIcon from "@mui/icons-material/InsertInvitationTwoTone";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function AdminNoFixturesButton(props) {
  const [loading, setLoading] = useState(false);
  const [fixtureCount, setFixtureCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet(
          `fixtures/${props.leagueId}/fixtureCount`
        );
        setFixtureCount(result.data);
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, []);

  const createFixtures = async () => {
    setLoading(true);
    try {
      const result = await api.apiPost(
        `fixtures/${props.leagueId}/createFixtures`
      );
      setFixtureCount(result.data);
      setLoading(false);
    } catch (err) {
      // error handling code
      setLoading(false);
    }
  };

  return (
    <Box>
      {fixtureCount === 0 && (
        <Button onClick={createFixtures}>Auto Create Fixtures</Button>
      )}
    </Box>
  );
}
