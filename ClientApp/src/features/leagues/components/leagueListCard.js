import {
  Button,
  Typography,
  Box,
  Link,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
  Stack,
} from "@mui/material";
import LeagueListCardStatusDisplay from "./leagueListCardStatusDisplay";
import LeagueCardHighestScore from "./leagueCardHighestScore";
import LeagueCardAverageScore from "./leagueCardAverageScore";
import LeagueCardAverageHandicap from "./leagueCardAverageHandicap";

export default function LeagueListCard(props) {
  const theme = useTheme();

  const renderLeagueTags = (playersPerTeam, teamCount) => {
    return (
      <>
        <Chip
          sx={{ mr: 1 }}
          size="small"
          label={`${playersPerTeam} players per team`}
          color="secondary"
        />

        <Chip
          sx={{ mr: 1 }}
          size="small"
          label={`${teamCount} teams`}
          color="secondary"
        />
      </>
    );
  };

  return (
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
        <Link
          underline="none"
          sx={{
            transition: "all .2s",
            opacity: 1,
            "&:hover": { opacity: 0.8 },
          }}
          href="#"
        >
          <img src="/static/images/placeholders/fitness/1.jpg" alt="..." />
        </Link>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Box
              sx={{
                pb: 1,
              }}
            >
              {renderLeagueTags(
                props.league?.playersPerTeam,
                props.league?.startingTeams
              )}
            </Box>
            <Link
              underline="none"
              sx={{
                "&:hover": { color: theme.colors.primary.dark },
              }}
              href={`league/${props?.league?.leagueUid}`}
            >
              {props.league?.leagueName}
            </Link>
            <Typography variant="body2">
              {props.league?.leagueIntroduction}
            </Typography>
          </>
        }
        primaryTypographyProps={{ variant: "h3" }}
        secondary={
          <>
            March 14, 2021 - March 28, 2021
            <Stack direction="row" spacing={2}>
              <LeagueListCardStatusDisplay
                leagueStatus={props.league?.leagueStatus}
              />
            </Stack>
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
        sx={{ my: { xs: 2, md: 0 } }}
        display="flex"
        alignItems="center"
        justifyContent="flex-right"
      >
        <Stack>
          <LeagueCardHighestScore
            value={props?.league?.leagueStatistics?.highestScore}
          />
          <LeagueCardAverageScore
            value={props?.league?.leagueStatistics?.leagueAverageScore}
          />
          <LeagueCardAverageHandicap
            value={props?.league?.leagueStatistics?.averageHandicap}
          />
        </Stack>

        <Button
          sx={{
            mx: 2,
          }}
          variant="outlined"
          size="small"
          to={`league/${props?.league?.leagueUid}`}
        >
          View League
        </Button>
      </Box>
    </ListItem>
  );
}
