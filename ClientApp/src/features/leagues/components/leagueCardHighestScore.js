import {
  Box,
  useTheme,
} from "@mui/material";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import Text from "global/components/Text";

export default function LeagueCardHighestScore(props) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
    <Text color="warning">
      <LocalFireDepartmentTwoToneIcon />
    </Text>
    <b>Highest Score: {props.value ?? '??'}</b>
    </Box>
  );
}
