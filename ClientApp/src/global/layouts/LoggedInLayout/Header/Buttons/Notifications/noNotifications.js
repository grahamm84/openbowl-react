import { Alert, Box, ListItem } from "@mui/material";
import PropTypes from "prop-types";

function NoNotifications(props) {
  let message = "No new notifications";
  if (props.overrideMessage) {
    message = props.overrideMessage;
  }
  return (
    <ListItem
      sx={{
        p: 2,
        minWidth: 350,
        maxWidth: 350,
        display: { xs: "block", sm: "flex" },
      }}
    >
      <Box flex="1">
        <Alert severity="success" variant="outlined">
          {message}
        </Alert>
      </Box>
    </ListItem>
  );
}

export default NoNotifications;

NoNotifications.propTypes = {
  overrideMessage: PropTypes.string,
};
