import { Box, Typography, styled, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

const BoxWrapper = styled(Box)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      border-radius: ${theme.general.borderRadius};
      text-align: center;
      width: ${theme.spacing(9)};
      height: ${theme.spacing(9)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1.5)};
      flex-shrink: 0;
      transition: ${theme.transitions.create(["background"])};
`
);

const dateDisplayOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function CalendarFixtureCardDate(props) {
  const params = useParams();
  const theme = useTheme();

  var date = new Date(props.date);
  return (
    <BoxWrapper className="MuiDate-wrapper">
      <Box>
        <Typography variant="h2" color="text.primary">
          {date.getDate()}
        </Typography>
        <Typography variant="subtitle2">
          {date.toLocaleString("default", { month: "long" })}
        </Typography>
      </Box>
    </BoxWrapper>
  );
}

export default CalendarFixtureCardDate;
