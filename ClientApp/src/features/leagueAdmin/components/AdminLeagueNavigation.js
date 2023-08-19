import * as React from "react";
import {
  Box,
  Grid,
  Card,
  Tooltip,
  CardActionArea,
  Typography,
  IconButton,
  Button,
  alpha,
  styled,
} from "@mui/material";

import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";
import ContactSupportTwoToneIcon from "@mui/icons-material/ContactSupportTwoTone";
import Text from "global/components/Text";
import { Link, useParams, RouterLink } from "react-router-dom";

const CardActionAreaWrapper = styled(CardActionArea)(
  ({ theme }) => `
        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: ${theme.colors.primary.main};
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `
);

const BoxComposedImage = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    filter: grayscale(80%);
    background-size: cover;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);

const BoxComposedBg = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);

const CardWrapper = styled(Box)(
  ({ theme }) => `
      background: ${alpha(theme.colors.alpha.black[10], 0.05)};
  `
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
      background: transparent;
      transition: ${theme.transitions.create(["all"])};
      color: ${theme.colors.alpha.trueWhite[70]};
      border-radius: 50px;
  
      &:hover {
        background: transparent;
        color: ${theme.colors.alpha.trueWhite[100]};
      }
  `
);

const ButtonWrapper = styled(Button)(
  ({ theme }) => `
      background: ${theme.colors.alpha.trueWhite[10]};
      border-color: ${theme.colors.alpha.trueWhite[30]};
      transition: ${theme.transitions.create(["all"])};
      color: ${theme.colors.alpha.trueWhite[100]};
      border-radius: 50px;
  
      &:hover {
        background: ${alpha(theme.colors.alpha.trueWhite[100], 0.2)};
        border-color: ${theme.colors.alpha.trueWhite[30]};
        color: ${theme.colors.alpha.trueWhite[100]};
      }
  `
);

export default function AdminLeagueNavigation(props) {
  return (
    <CardWrapper p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardActionAreaWrapper
              sx={{
                p: 2,
              }}
              component={Link}
              to={`/league-admin/${props.leagueId}`}
            >
              <Text color="warning">
                <AccountTreeTwoToneIcon
                  sx={{
                    mb: 1,
                  }}
                />
              </Text>
              <Typography gutterBottom variant="h4">
                League Settings
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Manage information about your league and its settings
              </Typography>
            </CardActionAreaWrapper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardActionAreaWrapper
              sx={{
                p: 2,
              }}
              component={Link}
              to={`/league-admin/${props.leagueId}/teams`}
            >
              <Text color="success">
                <ContactSupportTwoToneIcon
                  sx={{
                    mb: 1,
                  }}
                />
              </Text>
              <Typography gutterBottom variant="h4">
                Teams & Players
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Manage your teams and players
              </Typography>
            </CardActionAreaWrapper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardActionAreaWrapper
              sx={{
                p: 2,
              }}
              component={Link}
              to={`/league-admin/${props.leagueId}/fixtures`}
            >
              <Text color="primary">
                <DashboardCustomizeTwoToneIcon
                  sx={{
                    mb: 1,
                  }}
                />
              </Text>
              <Typography gutterBottom variant="h4">
                Competitions & Fixtures
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Manage Competitions and Fixtures
              </Typography>
            </CardActionAreaWrapper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardActionAreaWrapper
              sx={{
                p: 2,
              }}
              component={Link}
              to={`/league-admin/${props.leagueId}/results`}
            >
              <Text color="error">
                <PeopleOutlineTwoToneIcon
                  sx={{
                    mb: 1,
                  }}
                />
              </Text>
              <Typography gutterBottom variant="h4">
                Results
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Manage Fixture Results and Tables
              </Typography>
            </CardActionAreaWrapper>
          </Card>
        </Grid>
      </Grid>
    </CardWrapper>
  );
}
