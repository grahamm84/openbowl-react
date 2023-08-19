import {
  LocalFireDepartmentTwoTone,
  PendingTwoTone,
  TimerTwoTone,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
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
  Link,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Chip,
  useTheme,
} from "@mui/material";
import FixtureCreatePopup from "features/leagues/components/adminEditResultsPopup";
import Text from "global/components/Text";
import * as storage from "global/helpers/storageService";
import { useParams } from "react-router-dom";
import CalendarFixtureCardDate from "./calendarFixtureCardDate";

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

function CalendarFixtureCard(props) {
  const params = useParams();
  const theme = useTheme();

  let currentLeagueId = params.leagueUid;

  var date = new Date(props.event.eventTimeUtc);
  return (
    <Card>
      <ListItem
        sx={{
          display: { xs: "block", md: "flex" },
          py: 3,
        }}
      >
        <ListItemAvatar
          sx={{
            mr: 2,
          }}
        >
          <CalendarFixtureCardDate date={props.event.eventTimeUtc} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Box
                sx={{
                  pb: 1,
                }}
              >
                <>{/* can put some stuff here */}</>
              </Box>
              <Link
                underline="none"
                sx={{
                  "&:hover": { color: theme.colors.primary.dark },
                }}
                href="#"
              >
                {date.toLocaleDateString(undefined, dateDisplayOptions)}
              </Link>
            </>
          }
          primaryTypographyProps={{ variant: "h3" }}
          secondary={
            <>
              {props.event.eventNotes}
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  pt: 1,
                }}
              >
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
                      <ListItem key={`fixture-${fixture.id}`}>
                        {fixture.homeTeamName} vs {fixture.awayTeamName}
                      </ListItem>
                    ))}
                  </List>
                )}

                <AvatarInfo>
                  <TimerTwoTone />
                </AvatarInfo>
                <Text color="info">
                  <b>In Progress</b>
                </Text>
              </Box>
            </>
          }
          secondaryTypographyProps={{
            variant: "subtitle2",
            sx: {
              pt: 1,
            },
          }}
        />
        <Box
          sx={{
            my: { xs: 2, md: 0 },
          }}
          display="flex"
          alignItems="center"
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
          >
            View course
          </Button>
          <IconButtonWrapper size="small" color="secondary">
            <PendingTwoTone />
          </IconButtonWrapper>
        </Box>
      </ListItem>
    </Card>
  );
}

export default CalendarFixtureCard;
