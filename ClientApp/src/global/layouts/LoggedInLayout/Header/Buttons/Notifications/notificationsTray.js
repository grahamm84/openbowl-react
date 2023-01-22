import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import { styled } from "@mui/material/styles";

import * as api from "global/apiClient";
import { Link } from "react-router-dom";
import NotificationItem from "./notificationItem";
import NoNotifications from "./noNotifications";

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const [notificationData, setNotificationData] = useState({
    notificationCount: 0,
    notifications: [],
  });

  const MarkAsUnread = async (notificationUid) => {
    try {
      const result = await api.apiPost(
        "notifications/mark-read",
        notificationUid
      );
      if (result.data) {
        var updatedNotifications = notificationData.notifications.filter(
          (notification) => notification.notificationUid !== result.data
        );
        setNotificationData({
          notificationCount: notificationData.notificationCount - 1,
          notifications: updatedNotifications,
        });
      }
    } catch (err) {
      // error handling code
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const result = await api.apiGet("notifications/most-recent");
          setNotificationData(result.data);
        } catch (err) {
          // error handling code
        }
      };
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={notificationData.notificationCount}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Latest Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notificationData && notificationData?.notifications?.length ? (
            notificationData.notifications
              .filter((notification, index) => index < 5)
              .map((notification) => {
                return (
                  <NotificationItem
                    key={notification.notificationUid}
                    notification={notification}
                    markAsUnread={MarkAsUnread}
                  />
                );
              })
          ) : (
            <NoNotifications />
          )}
          <Divider />
          <Link to="messages" style={{ textDecoration: "none" }}>
            <ListItem>
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
              >
                View All Notifications{" "}
              </Typography>
            </ListItem>
          </Link>
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
