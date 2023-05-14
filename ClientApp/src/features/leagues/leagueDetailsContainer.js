import { React, useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Button,
  Grid,
  LinearProgress,
  Typography,
  Drawer,
  List,
  Card,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContentContainer from "global/layouts/LoggedInLayout/ContentContainer";
import { AddTwoTone, HandshakeTwoTone } from "@mui/icons-material";

import {
  Tooltip,
  Box,
  Badge,
  ListItem,
  ListItemText,
  Checkbox,
  Link,
  alpha,
  Avatar,
  styled,
  useTheme,
} from "@mui/material";

import { formatDistance, subMinutes } from "date-fns";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";
import ContactSupportTwoToneIcon from "@mui/icons-material/ContactSupportTwoTone";
import Text from "global/components/Text";
import LeagueDetailsTabMenu from "./components/leagueDetailsTabMenu";

export default function LeagueDetailsContainer() {
  const [loading, setLoading] = useState(false);
  const [league, setLeague] = useState([{}]);
  const [leagueUpdated, setLeagueUpdated] = useState(0);
  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet(`league/${params.leagueUid}`);
        console.log(result);
        setLeague(result.data);
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, [leagueUpdated]); //monitor this state and re-call when this updates

  const renderLoadingBar = () => {
    return (
      <Grid item xs={12}>
        <LinearProgress />
      </Grid>
    );
  };

  const CardActions = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      top: ${theme.spacing(2)};
      z-index: 7;
    `
  );

  const CardActionAreaWrapper = styled(CardActionArea)(
    ({ theme }) => `
          .MuiTouchRipple-root {
            opacity: .2;
          }
    
          .MuiCardActionArea-focusHighlight {
            background: ${theme.colors.alpha.trueWhite[100]};
          }
    
          &:hover {
            .MuiCardActionArea-focusHighlight {
              opacity: .1;
            }
          }
    `
  );

  const DotLegend = styled("span")(
    ({ theme }) => `
        border-radius: 22px;
        width: ${theme.spacing(2.5)};
        height: ${theme.spacing(2.5)};
        display: inline-block;
        border: ${theme.colors.alpha.white[100]} solid 2px;
        position: relative;
  
        &::after {
            content: ' ';
            border-radius: 22px;
            position: absolute;
            width: ${theme.spacing(1.1)};
            height: ${theme.spacing(1.1)};
            top: ${theme.spacing(0.5)};
            left: ${theme.spacing(0.5)};
            background: ${theme.colors.alpha.white[100]};
        }
    `
  );

  const renderNavigation = () => {
    return (
      <LeagueDetailsTabMenu activeTab="dashboard" leagueUid={params.leagueUid}>
        <h3>Test</h3>
      </LeagueDetailsTabMenu>
    );
  };

  return (
    <ContentContainer
      title={league.leagueName ?? "League Details"}
      //subtitle="View and Manage your bowling leagues"
      icon={<HandshakeTwoTone fontSize="large" />}
      // action={
      //   <Button
      //     color="primary"
      //     variant="contained"
      //     startIcon={<AddTwoTone fontSize="large" />}
      //     onClick={(e) => openDrawer()}
      //   >
      //     Create New League
      //   </Button>
      // }
    >
      {loading ? renderLoadingBar() : renderNavigation()}
    </ContentContainer>
  );
}
