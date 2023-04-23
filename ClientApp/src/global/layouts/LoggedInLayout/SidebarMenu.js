import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
} from "@mui/material";

import { SidebarContext } from "../../contexts/SidebarContext";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { HomeTwoTone, PersonOutlineTwoTone } from "@mui/icons-material";
import PermissionWrapperVisibility from "global/components/PermissionWrapper";
import { Users_View } from "global/helpers/UserRoleConstants";

const MenuWrapper = styled(Box)(
  () => `
  .MuiList-root {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & > .MuiList-root {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
    }
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    width: 100%;
    .MuiList-root {
      padding: 0;
      display: flex;
      flex-direction: row;
      
      .MuiList-root .MuiList-root .MuiListItem-root .MuiIconButton-root {
        font-weight: normal !important;
      }

      .MuiListItem-root {
        padding: 0 2px;
        justify-content: center;
        width: auto;

        &:last-child {
          margin-left: auto;
        }
    
        .MuiIconButton-root {
          display: flex;
          background-color: transparent;
          border-radius: ${theme.general.borderRadiusLg};
          justify-content: center;
          font-size: ${theme.typography.pxToRem(14)};
          padding: ${theme.spacing(1.4, 2)};
          position: relative;
          font-weight: bold;
          color: ${theme.colors.alpha.trueWhite[100]};

          .name-wrapper {
            transition: ${theme.transitions.create(["color"])};
          }

          .MuiBadge-root {
            position: absolute;
            right: 16px;
            top: 12px;

            .MuiBadge-badge {
              background: ${theme.colors.alpha.white[70]};
              color: ${theme.colors.alpha.black[100]};
              font-size: ${theme.typography.pxToRem(11)};
              font-weight: bold;
              text-transform: uppercase;
            }
          }
  
          .MuiSvgIcon-root {
            transition: ${theme.transitions.create(["color"])};
            font-size: ${theme.typography.pxToRem(24)};
            margin-right: ${theme.spacing(1)};
            color: ${theme.colors.alpha.trueWhite[50]};
          }

          &.active,
          &:hover {
            background-color: ${theme.colors.alpha.white[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  component={Link}
                  to="/homepage"
                  className={currentRoute === "/homepage" ? "active" : ""}
                  disableRipple
                  onClick={closeSidebar}
                  startIcon={<HomeTwoTone />}
                >
                  Home
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Pages
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  className={currentRoute === "/blank" ? "active" : ""}
                  disableRipple
                  component={Link}
                  to="/blank"
                  onClick={closeSidebar}
                  startIcon={<PersonOutlineTwoTone />}
                >
                  Blank Page
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Management
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  className={currentRoute === "/profile" ? "active" : ""}
                  disableRipple
                  component={Link}
                  to="/profile"
                  onClick={closeSidebar}
                  startIcon={<PersonOutlineTwoTone />}
                >
                  Your Profile
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>

        <PermissionWrapperVisibility permissions={[Users_View]}>
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Configuration
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <PermissionWrapperVisibility permissions={[Users_View]}>
                  <ListItem component="div">
                    <Button
                      className={currentRoute === "/users" ? "active" : ""}
                      disableRipple
                      component={Link}
                      to="/users"
                      onClick={closeSidebar}
                      startIcon={<AccountCircleTwoToneIcon />}
                    >
                      Users
                    </Button>
                  </ListItem>
                </PermissionWrapperVisibility>
              </List>
            </SubMenuWrapper>
          </List>
        </PermissionWrapperVisibility>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
