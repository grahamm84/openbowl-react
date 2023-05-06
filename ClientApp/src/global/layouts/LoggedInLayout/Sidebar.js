import { useContext } from "react";
import { SidebarContext } from "global/contexts/SidebarContext";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Card,
  theme
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import Logo from "global/components/logo/Logo";
import Footer from "global/components/Footer";
import Label from "global/components/Label";

const SidebarWrapper = styled(Card)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    background: ${theme.sidebar.background};
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        position: fixed;
        height: calc(100% - ${theme.spacing(8)});
        margin: ${theme.spacing(4, 0, 4, 4)};
        z-index: 10;
        border-radius: ${theme.general.borderRadius};
    }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 80px;
        align-items: center;
        margin: 0 ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: 'none', lg: 'inline-block' }
        }}
      >
        <TopSection>
          <Logo />
        </TopSection>
        <Box
          sx={{
            height: 'calc(100% - 80px)'
          }}
        >
          <Scrollbar>
            <Box pt={1}>
              <SidebarMenu />
            </Box>
          </Scrollbar>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          display: { lg: 'none', xs: 'inline-block' }
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;

