import { Box, Chip, ListItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";

function NotificationItem(props) {
  return (
    <ListItem
      key={props.notification.notificationUid}
      sx={{
        p: 2,
        minWidth: 350,
        maxWidth: 350,
        display: { xs: "block", sm: "flex" },
      }}
    >
      <Box flex="1">
        <Box
          key={`select-option-${props.notification.notificationUid}`}
          display="flex"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 220,
            }}
          >
            {props.notification.notificationUid}
          </Typography>
          <Typography variant="caption" sx={{ textTransform: "none" }}>
            {formatDistance(
              parseISO(props.notification.notificationDate),
              new Date(),
              {
                addSuffix: true,
              }
            )}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" component="span">
          {props.notification.notificationText}
        </Typography>

        {props.notification.notificationReadDate ? (
          <Box mt={1}>
            <Chip
              icon={<MarkEmailReadTwoToneIcon />}
              label="Read"
              variant="outlined"
              color="success"
            />
          </Box>
        ) : (
          <Box mt={1}>
            <Chip
              icon={<MarkEmailReadTwoToneIcon />}
              label="Mark as read"
              variant="outlined"
              size="small"
              onClick={() =>
                props.markAsUnread(props.notification.notificationUid)
              }
            />
          </Box>
        )}
      </Box>
    </ListItem>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
  markAsUnread: PropTypes.func,
};
export default NotificationItem;
