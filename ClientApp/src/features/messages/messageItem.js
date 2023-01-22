import {
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  styled,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import { format, parseISO } from "date-fns";

function MessageItem(props) {
  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
  `
  );

  return (
    <ListItem
      sx={{ p: 3 }}
      secondaryAction={
        <ListItemText alignContent="flex-start">
          <Typography variant="h5" gutterBottom>
            <Box mt={1}>
              {props.notification.isRead ? (
                <Chip
                  icon={<MarkEmailReadTwoToneIcon />}
                  label="Mark as unread"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    props.markAsUnread(props.notification.notificationUid)
                  }
                />
              ) : (
                <Chip
                  icon={<MarkEmailReadTwoToneIcon />}
                  label="Mark as read"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    props.markAsUnread(props.notification.notificationUid)
                  }
                />
              )}
            </Box>
          </Typography>
        </ListItemText>
      }
    >
      <ListItemAvatar sx={{ pr: 2 }}>
        <AvatarWrapper src="/static/images/logo/google.svg" />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: "h5",
          gutterBottom: true,
        }}
        secondaryTypographyProps={{
          variant: "subtitle2",
          lineHeight: 1,
        }}
        primary={props.notification.notificationText}
        secondary={
          props.notification.notificationDate &&
          format(parseISO(props.notification.notificationDate), "PPPPpppp")
        }
      />
    </ListItem>
  );
}

MessageItem.propTypes = {
  notification: PropTypes.object.isRequired,
  markAsUnread: PropTypes.func,
};

export default MessageItem;
