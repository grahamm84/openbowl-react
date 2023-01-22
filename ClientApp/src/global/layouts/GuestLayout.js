import React, { Component } from "react";
import {
  Box,
  Typography,
  Hidden,
  Container,
  Button,
  Grid,
  styled,
} from "@mui/material";
import { PublicRoutes } from "../routing/publicRoutes";

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.blue5};
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

export default function GuestLayout(props) {
  return (
    <>
      <MainContent>
        <Grid
          container
          sx={{ height: "100%" }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box mb={16} textAlign="center">
                <Box mb={8}>
                  <img alt="login icon" height={64} src="login.svg" />
                </Box>

                <PublicRoutes />
              </Box>
            </Container>
          </Grid>
          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >
              <Container maxWidth="sm">
                <Box textAlign="center">
                  <TypographyPrimary variant="h1" sx={{ my: 2 }}>
                    Your App Name and Details
                  </TypographyPrimary>
                  <TypographySecondary
                    variant="h4"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                  >
                    Add some text about why your app is amazing. This can be
                    quite a few lines long as you can see from this.
                  </TypographySecondary>
                  <Button href="/" size="large" variant="contained">
                    Overview
                  </Button>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
        </Grid>
      </MainContent>
    </>
  );
}
