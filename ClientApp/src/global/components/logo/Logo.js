import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/home">
      <Box mb={1}>
        <img alt="login icon" height={64} src="/login.svg" />
      </Box>
    </Link>
  );
}

export default Logo;
