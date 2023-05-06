import { useContext } from "react";

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Card,
  Container,
  darken,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "global/contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

//import HeaderButtons from "./Buttons";
//import HeaderUserbox from "./Userbox";
//import HeaderMenu from "global/layouts/LoggedInLayout/Header/Menu/HeaderMenu";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import {} from "@mui/material";
//import NavigationMenu from "./NavigationMenu";
//import LanguageSwitcher from "./LanguageSwitcher";
//import Notifications from "./Notifications";
import Userbox from "./Userbox";
import Logo from "global/components/logo/Logo";
import NavigationMenu from "./NavigationMenu";
import HeaderMenu from "./Menu/HeaderMenu";
//import Search from "./Search";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        margin-top: ${theme.spacing(3)};
        position: relative;
        justify-content: space-between;
        width: 100%;
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Logo />
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'inline-block' }
          }}
        >
          <HeaderMenu />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
