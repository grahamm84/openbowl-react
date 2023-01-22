import { useState, useContext } from "react";
import { Container, Tabs, Tab, Grid, styled } from "@mui/material";
import Footer from "global/components/Footer";

import ProfileInformationView from "features/profile/components/ProfileInformationView";
import SecurityTab from "features/profile/SecurityTab";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import { UserProfileContext } from "global/layouts/LoggedInLayout/LoggedInLayout";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ProfileContainer() {
  const [currentTab, setCurrentTab] = useState("edit_profile");
  const [user] = useContext(UserProfileContext);

  const tabs = [
    { value: "edit_profile", label: "Edit Profile" },
    { value: "security", label: "Passwords/Security" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <PageHeader title="Profile" subtitle={`Welcome back ${user.name}`} />
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            {currentTab === "edit_profile" && <ProfileInformationView />}
            {currentTab === "security" && <SecurityTab />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProfileContainer;
