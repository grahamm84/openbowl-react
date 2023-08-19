import {
  Box,
  Button,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  useTheme,
  styled,
} from "@mui/material";
import { Fragment } from "react";
import Text from "global/components/Text";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { EditTwoTone } from "@mui/icons-material";
import PlayerEditForm from "./playerEditForm";

const DotLegend = styled("span")(
  ({ theme }) => `
      border-radius: 22px;
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);

function PlayerEditFromTeamCard(props) {
  const handlePlayerUpdated = () => {
    props.refreshOnUpdate();
  };

  const theme = useTheme();
  console.log(props.player);
  return (
    <Fragment key={props.player.id}>
      <ListItem
        sx={{
          "&:hover": {
            background: `${theme.colors.alpha.black[5]}`,
          },
        }}
        secondaryAction={
          <>
            <PlayerEditForm
              player={props.player}
              refreshOnUpdate={props.refreshOnUpdate}
            />
          </>
        }
      >
        <ListItemAvatar
          sx={{
            mr: 1,
          }}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
            }}
            alt={props.player.displayName}
            src={props.player.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{
            flexGrow: 0,
            maxWidth: "50%",
            flexBasis: "50%",
          }}
          disableTypography
          primary={
            <Typography
              sx={{
                pb: 0.6,
              }}
              color="text.primary"
              variant="h5"
            >
              {props.player.displayName}
            </Typography>
          }
          secondary={
            <>
              <Box display="flex" alignItems="flex-start">
                {props.player.isActive && (
                  <DotLegend
                    style={{
                      background: `${theme.colors.success.main}`,
                    }}
                  />
                )}

                {!props.player.isActive && (
                  <DotLegend
                    style={{
                      background: `${theme.colors.error.main}`,
                    }}
                  />
                )}

                <Typography
                  sx={{
                    fontSize: `${theme.typography.pxToRem(11)}`,
                    lineHeight: 1,
                  }}
                  variant="body1"
                >
                  {props.player.isActive && (
                    <Text color="primary">{`${props.player.firstName} ${props.player.lastName} (${props.player.nickname})`}</Text>
                  )}
                  {!props.player.isActive && (
                    <Text color="primary">Player Disabled</Text>
                  )}
                </Typography>
              </Box>
            </>
          }
        />
      </ListItem>
      <Divider />
    </Fragment>
  );
}

export default PlayerEditFromTeamCard;
