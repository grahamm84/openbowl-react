import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  MenuItem,
  Menu,
  Container,
  styled,
} from "@mui/material";
import DocumentScannerTwoToneIcon from "@mui/icons-material/DocumentScannerTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import AddAlertTwoToneIcon from "@mui/icons-material/AddAlertTwoTone";

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? "0 1px 0 " +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ", 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)"
          : "0px 2px 4px -3px " +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ", 0px 5px 16px -4px " +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

function PageHeader(props) {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <Box
        display="flex"
        alignItems={{ xs: "stretch", md: "center" }}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          {props.icon ? (
            <AvatarPageTitle variant="rounded">{props.icon}</AvatarPageTitle>
          ) : undefined}
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="subtitle2">
              {props.subtitle ? (
                <Typography variant="subtitle2">{props.subtitle}.</Typography>
              ) : undefined}
            </Typography>
          </Box>
        </Box>
        {props.action ? (
          <Box mt={{ xs: 3, md: 0 }}>{props.action}</Box>
        ) : undefined}
      </Box>
    </PageTitle>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
};

export default PageHeader;
