import { Box, useTheme } from "@mui/material";
import CompareArrowsTwoTone from "@mui/icons-material/CompareArrowsTwoTone";
import Text from "global/components/Text";

export default function LeagueCardAverageHandicap(props) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Text color="secondary">
        <CompareArrowsTwoTone />
      </Text>
      <b>Average Handicap: {props.value ?? "??"}</b>
    </Box>
  );
}
