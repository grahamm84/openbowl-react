import { Box, useTheme } from "@mui/material";
import ScoreTwoTone from "@mui/icons-material/ScoreTwoTone";
import Text from "global/components/Text";

export default function LeagueCardAverageScore(props) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Text color="primary">
        <ScoreTwoTone />
      </Text>
      <b>Average Score: {props.value ?? "??"}</b>
    </Box>
  );
}
