import { Box } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications/notificationsTray";

function HeaderButtons() {
  return (
    <Box
    sx={{
      mr: 1.5
    }}
  >
    <HeaderSearch />
    <Box
      sx={{
        mx: 0.5
      }}
      component="span"
    >
      <HeaderNotifications />
    </Box>
    <Box
      component="span"
      sx={{
        display: { xs: 'none', sm: 'inline-block' }
      }}
    >
      {/* <LanguageSwitcher /> */}
    </Box>
  </Box>
  );
}

export default HeaderButtons;
