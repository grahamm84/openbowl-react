import {
  LocalFireDepartmentTwoTone,
  PendingTwoTone,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Typography,
  ListItem,
  styled,
  List,
  Alert,
  Stack,
  Card,
  Button,
  IconButton,
  Avatar,
  useTheme,
  Grid,
} from "@mui/material";
import FixtureCreatePopup from "features/leagues/components/adminEditResultsPopup";
import Text from "global/components/Text";
import CalendarFixtureCardDate from "./calendarFixtureCardDate";
import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BoxWrapper = styled(Box)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      border-radius: ${theme.general.borderRadius};
      text-align: center;
      width: ${theme.spacing(9)};
      height: ${theme.spacing(9)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1.5)};
      flex-shrink: 0;
      transition: ${theme.transitions.create(["background"])};
`
);

const ListItemWrapper = styled(ListItem)(
  ({ theme }) => `
      border-radius: 0;
      padding: ${theme.spacing(2)};
      
      &:hover {
        .MuiDate-wrapper {
            background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        }
      }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color: ${theme.colors.success.main};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      margin-right: ${theme.spacing(1)};
`
);

const AvatarPending = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color: ${theme.colors.warning.main};
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
      margin: 0 auto ${theme.spacing(2)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(42)};
      }
`
);

const AvatarEvents = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.info.lighter};
      color: ${theme.colors.info.main};
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
      margin: 0 auto ${theme.spacing(2)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(42)};
      }
`
);

const AvatarInfo = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.info.lighter};
      color: ${theme.colors.info.main};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      margin-right: ${theme.spacing(1)};
`
);

const dateDisplayOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
      color: ${theme.colors.alpha.black[70]};
      
      &:hover {
        color: ${theme.colors.alpha.black[100]};
      }
`
);

const handleClick = () => {
  console.log("handleClick");
};

const handleDelete = () => {
  console.log("handleDelete");
};

function DisplayFixtureTeams(props) {
  return (
    <ListItem key={`fixture-${props.fixture.id}`}>
      {props.fixture.homeTeamName} vs {props.fixture.awayTeamName}
    </ListItem>
  );
}

function AdminEventListItem(props) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const theme = useTheme();

  let currentLeagueId = params.leagueUid;

  var date = new Date(props.event.eventTimeUtc);
  console.log("whats on this card", props);
  return (
    <>
      <Card>
        <ListItemWrapper alignItems="flex-start">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={1}>
              <CalendarFixtureCardDate date={date} />
            </Grid>

            <Grid item xs>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    pt: 1,
                  }}
                  color="text.primary"
                  noWrap
                  gutterBottom
                >
                  {date.toLocaleDateString(undefined, dateDisplayOptions)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {props.event.eventNotes}
                </Typography>

                {console.log(
                  "event fixtures",
                  props.event.fixtures,
                  props.event.fixtures?.length
                )}
                {props.event.fixtures?.length === 0 && (
                  <Stack direction={"row"} spacing={2}>
                    <Alert severity="warning">
                      No fixtures have been created for this event
                    </Alert>
                    <FixtureCreatePopup
                      size="small"
                      leagueId={currentLeagueId}
                      scheduleId={props.event.id}
                    />
                  </Stack>
                )}
                {props.event.fixtures?.length > 0 && (
                  <List>
                    {props.event.fixtures.map((fixture) => (
                      <DisplayFixtureTeams key={fixture.id} fixture={fixture} />
                    ))}
                  </List>
                )}
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  my: { xs: 2, md: 0 },
                }}
                display="flex"
                alignItems="right"
                justifyContent="flex-right"
              >
                <Box display="flex" alignItems="center">
                  <Text color="warning">
                    <LocalFireDepartmentTwoTone />
                  </Text>
                  <b>9.2</b>
                </Box>
                <Button
                  sx={{
                    mx: 2,
                  }}
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`${props.event.id}`}
                >
                  Edit Fixture
                </Button>
                <IconButtonWrapper size="small" color="secondary">
                  <PendingTwoTone />
                </IconButtonWrapper>
              </Box>
            </Grid>
          </Grid>
        </ListItemWrapper>
      </Card>
    </>
  );
}

export default AdminEventListItem;
