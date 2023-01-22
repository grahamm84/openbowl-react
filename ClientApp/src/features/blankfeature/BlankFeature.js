import React from "react";
import Typography from "@mui/material/Typography";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { Card, Grid } from "@mui/material";

export default function BlankFeature() {
  return (
    <ContentContainer title="New Feature" subtitle="a template to start using">
      <Grid item xs={3}>
        <Card>
          <Typography>Test</Typography>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <Typography>Test</Typography>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <Typography>Test</Typography>
        </Card>
      </Grid>
    </ContentContainer>
  );
}
