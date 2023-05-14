import { useState, forwardRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { useNavigate } from "react-router-dom";

function LeagueDetailsTabMenu(props) {
  const TabsWrapper = styled(Tabs)(
    ({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px) {
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            box-shadow: none;
        }
      }
      `
  );

  const navigate = useNavigate();

  const handleTabsChange = (_event, tabsValue) => {
    let value = null;

    if (tabsValue !== "all") {
      navigate(`/${tabsValue.url}}`);
    }
  };

  const tabs = [
    {
      value: "dashboard",
      label: "Dashboard",
      url: "dashboard",
    },
    {
      value: "table",
      label: "League Table",
      url: "table",
    },
    {
      value: "fixtures",
      label: "Fixtures",
      url: "fixtures",
    },
    {
      value: "stats",
      label: "Statistics",
      url: "statistics",
    },
  ];

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "center", sm: "space-between" }}
      pb={3}
    >
      <TabsWrapper
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={props.activeTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </TabsWrapper>
    </Box>
  );
}
export default LeagueDetailsTabMenu;
