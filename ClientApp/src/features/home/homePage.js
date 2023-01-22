import React from "react";
import Typography from "@mui/material/Typography";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { Grid } from "@mui/material";

export default function HomePage() {
  return (
    <ContentContainer title="Home" subtitle="Welcome to the homepage">
      <Grid item xs={12}>
        <Typography> Logged In!</Typography>
      </Grid>
    </ContentContainer>
  );
}
