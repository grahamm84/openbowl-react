import {
  Box,
  IconButton,
  Avatar,
  useTheme,
  styled,
} from "@mui/material";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import Text from "global/components/Text";

export default function LeagueListCardStatusDisplay(props) {
  const theme = useTheme();

  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
            background-color: ${theme.colors.success.lighter};
            color: ${theme.colors.success.main};
            width: ${theme.spacing(4)};
            height: ${theme.spacing(4)};
            margin-right: ${theme.spacing(1)};
      `
  );

  const AvatarError = styled(Avatar)(
    ({ theme }) => `
            background-color: ${theme.colors.error.lighter};
            color: ${theme.colors.error.main};
            width: ${theme.spacing(4)};
            height: ${theme.spacing(4)};
            margin-right: ${theme.spacing(1)};
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

  const IconButtonWrapper = styled(IconButton)(
    ({ theme }) => `
            color: ${theme.colors.alpha.black[70]};
            
            &:hover {
              color: ${theme.colors.alpha.black[100]};
            }
      `
  );

  const renderStatus = (status) => {
    if (status === 0) {
      return (
        <>
          <AvatarInfo>
            <TimerTwoToneIcon />
          </AvatarInfo>

          <Text color="info">
            <b>{"Not Started"}</b>
          </Text>
        </>
      );
    } else if (status === 1) {
      return (
        <>
          <AvatarSuccess>
            <TimerTwoToneIcon />
          </AvatarSuccess>

          <Text color="success">
            <b>{"In Progress"}</b>
          </Text>
        </>
      );
    } else if (status === 2) {
      return (
        <>
          <AvatarError>
            <TimerTwoToneIcon />
          </AvatarError>

          <Text color="error">
            <b>{"Finished"}</b>
          </Text>
        </>
      );
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        pt: 1,
      }}
    >
      {renderStatus(props.leagueStatus ?? 0)}
    </Box>
  );
}
