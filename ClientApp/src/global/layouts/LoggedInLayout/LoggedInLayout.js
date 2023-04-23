import {
  Box,
  Drawer,
  alpha,
  Card,
  Container,
  styled,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { ProtectedRoutes } from "global/routing/protectedRoutes";
import Sidebar from "global/layouts/LoggedInLayout/Sidebar";
import Header from "global/layouts/LoggedInLayout/Header";
import React, { useState, useEffect, createContext, useContext } from "react";
import * as api from "global/apiClient";
import Logo from "global/components/logo/Logo";
import SidebarMenu from "./SidebarMenu";
import { SidebarContext } from "global/contexts/SidebarContext";

export const UserProfileContext = createContext({});
const LoggedInLayout = ({ children }) => {
  const [userProfileData, setUserProfileData] = useState({ name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.apiGet("userprofile");
        setUserProfileData(result.data);
      } catch (err) {
        // error handling code
      }
    };
    // call the async fetchData function
    fetchData();
  }, []);

  const MainWrapper = styled(Box)(
    ({ theme }) => `
    padding: ${theme.spacing(0, 0, 4)};
  
    .MuiDrawer-fm .MuiPaper-root {
      top: 0;
      height: 100%;
    }
  
    .Mui-FixedWrapper .MuiPaper-root {
      top: 0;
      left: 0;
    }
    .MuiDrawer-hd .MuiPaper-root {
      top: 0;
      height: 100%;
    }
  
    .footer-wrapper {
      box-shadow: 0px 0px 2px ${theme.colors.alpha.black[30]};
  }
  `
  );

  const MainContent = styled(Container)(
    ({ theme }) => `
          margin-top: ${theme.spacing(-45)};
          position: relative;
          z-index: 55;
  `
  );

  const CardWrapper = styled(Card)(
    ({ theme }) => `
          min-height: 100vh;
          backdrop-filter: blur(5px);
          border-radius: ${theme.general.borderRadiusXl};
          background: ${alpha(theme.colors.alpha.white[100], 0.9)};
  `
  );

  const SidebarWrapper = styled(Box)(
    ({ theme }) => `
          width: ${theme.sidebar.width};
          min-width: ${theme.sidebar.width};
          color: ${theme.sidebar.textColor};
          background: ${theme.sidebar.background};
          box-shadow: ${theme.sidebar.boxShadow};
          position: relative;
          z-index: 5;
          height: 100%;
          @media (min-width: ${theme.breakpoints.values.lg}px) {
            height: calc(100% - ${theme.header.height});
            margin-top: ${theme.header.height};
          }
  `
  );

  const TopSection = styled(Box)(
    ({ theme }) => `
          margin: ${theme.spacing(2, 2)};
  `
  );

  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <UserProfileContext.Provider value={[userProfileData, setUserProfileData]}>
      <MainWrapper>
        <Header />
        {/* <Sidebar /> */}
        <MainContent maxWidth="xl">
          <Box mx={8}>
            <CardWrapper>
              <ProtectedRoutes />
              {children}
            </CardWrapper>
          </Box>

          <Drawer
            sx={{
              display: { lg: "none", xs: "inline-block" },
            }}
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={sidebarToggle}
            onClose={closeSidebar}
            variant="temporary"
            elevation={9}
          >
            <SidebarWrapper>
              {/* <Scrollbar> */}
              <TopSection>
                <Box
                  sx={{
                    width: 52,
                    ml: 1,
                    mt: 1,
                    mb: 3,
                  }}
                >
                  <Logo />
                </Box>
                {/* <SidebarTopSection /> */}
              </TopSection>
              <SidebarMenu />
              {/* </Scrollbar> */}
            </SidebarWrapper>
          </Drawer>
        </MainContent>
      </MainWrapper>
    </UserProfileContext.Provider>
  );
};

LoggedInLayout.propTypes = {
  children: PropTypes.node,
};

export default LoggedInLayout;
