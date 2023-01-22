import {
  Grid,
  List,
  Divider,
  Container,
  styled,
  Tabs,
  Tab,
  Paper,
  Skeleton,
} from "@mui/material";
import * as api from "global/apiClient";
import NoNotifications from "global/layouts/LoggedInLayout/Header/Buttons/Notifications/noNotifications";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import { useState, useEffect } from "react";
import MessageItem from "./messageItem";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function MessagesContainer() {
  const [messagesData, setMessagesData] = useState({
    notificationCount: 0,
    notifications: [],
  });

  const [currentTab, setCurrentTab] = useState("unread");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { value: "unread", label: "New Messages" },
    { value: "read", label: "Read" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const MarkAsUnread = async (notificationUid) => {
    try {
      const result = await api.apiPost(
        "notifications/mark-read",
        notificationUid
      );
      if (result.data) {
        const updatedData = messagesData.notifications.map((x) =>
          x.notificationUid === notificationUid
            ? { ...x, isRead: !x.isRead }
            : x
        );
        setMessagesData({
          notificationCount: messagesData.notificationCount,
          notifications: updatedData,
        });
      }
    } catch (err) {
      // error handling code
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.apiGet("notifications");
        setMessagesData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // error handling code
      }
    };
    // call the async fetchData function
    fetchData();
  }, []);

  const messageList = (isRead) => {
    if (messagesData) {
      var filteredMessages = messagesData.notifications.filter(
        (message) => message.isRead == isRead
      );

      if (
        messagesData?.notifications.length === 0 ||
        filteredMessages.length === 0
      ) {
        if (isRead) {
          return (
            <NoNotifications overrideMessage="You have 0 read notifications" />
          );
        } else {
          return <NoNotifications overrideMessage="No New Notifications" />;
        }
      }
      return (
        <List>
          {filteredMessages.map((notification) => {
            return (
              <MessageItem
                key={notification.notificationUid}
                notification={notification}
                markAsUnread={MarkAsUnread}
              />
            );
          })}
        </List>
      );
    }
  };

  const TabControl = () => {
    return (
      <TabsWrapper
        onChange={handleTabsChange}
        value={currentTab}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </TabsWrapper>
    );
  };

  const renderMessageTabs = () => {
    if (loading) {
      return (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      );
    } else {
      if (currentTab === "unread") {
        return messageList(false);
      } else {
        return messageList(true);
      }
    }
  };

  return (
    <>
      <PageHeader title="Notifications" />
      <Container id="messages-container" maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper sx={{ minHeight: 300 }}>
              <TabControl />
              <Divider />
              {renderMessageTabs()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MessagesContainer;
