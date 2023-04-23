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
//import Search from "./Search";

const TopBarWrapper = styled(Card)(
  ({ theme }) => `
    color: ${theme.header.textColor};
    background: ${alpha(darken(theme.colors.primary.dark, 0.2), 0.95)};
    backdrop-filter: blur(5px);
    margin: ${theme.spacing(0, 0, 5)};
    padding: ${theme.spacing(4, 0, 44)};

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      margin: ${theme.spacing(0, 8, 5)};
      padding: ${theme.spacing(4, 3, 44)};
    }
    display: flex;
    align-items: center;
    border-radius: 0;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    position: relative;
`
);

const TopBarImage = styled(Box)(
  () => `
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .7;
`
);

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    display: flex;
    width: 48px;
    margin-left: ${theme.spacing(2)};
    border-radius: ${theme.general.borderRadiusLg};
    height: 48px;
    justify-content: center;
    font-size: ${theme.typography.pxToRem(13)};
    padding: 0;
    position: relative;
    color: ${theme.colors.alpha.trueWhite[50]};
    background-color: ${theme.colors.alpha.white[10]};

    .MuiSvgIcon-root {
      transition: ${theme.transitions.create(["color"])};
      font-size: ${theme.typography.pxToRem(26)};
      color: ${theme.colors.alpha.trueWhite[50]};
    }

    &.active,
    &:hover {
      background-color: ${alpha(theme.colors.alpha.white[30], 0.2)};

      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.trueWhite[100]};
      }
    }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <TopBarWrapper>
      <TopBarImage
        sx={{
          opacity: 0.7,
          background: `${theme.colors.gradients.black1}`,
        }}
      />
      <TopBarImage
        sx={{
          opacity: 0.5,
          background: `${theme.colors.gradients.blue5}`,
        }}
      />
      <TopBarImage
        sx={{
          opacity: 0.15,
          backgroundImage: 'url("/images/bowling-cover2.jpg")',
        }}
      />
      <Container
        sx={{
          zIndex: 6,
        }}
        maxWidth="xl"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Logo />
            <Box
              component="span"
              sx={{
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              {/* <Search /> */}
            </Box>
          </Box>
          <Box display="flex">
            <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              {/* <LanguageSwitcher /> */}
              {/* <Box mx={1}>
                <Notifications />
              </Box> */}
              <HeaderButtons />
              <HeaderUserbox />
            </Box>
            {/* <Userbox /> */}
            <Box
              component="span"
              sx={{
                display: { md: "none", xs: "inline-flex" },
              }}
            >
              <Tooltip arrow title="Toggle Menu">
                <IconButtonPrimary color="primary" onClick={toggleSidebar}>
                  {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                </IconButtonPrimary>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <DividerWrapper
          sx={{
            display: { xs: "none", md: "flex" },
            my: 4,
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: "100%",
            display: { xs: "none", md: "inline-block" },
          }}
        >
          <NavigationMenu />
        </Box>
      </Container>
    </TopBarWrapper>
  );
}

export default Header;
