import _ from "lodash";
import { Formik, Form } from "formik";
import { setHours, setMinutes, subDays } from "date-fns";
import { useState } from "react";
import {
  styled,
  Box,
  Button,
  Divider,
  Card,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Autocomplete,
  Grid,
  Chip,
} from "@mui/material";
import * as api from "global/apiClient";
import { LoadingButton } from "@mui/lab";
import { DateTimePicker, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { CreateScheduleValidation } from "./createScheduleValidation";
import { CalendarTodayTwoTone, TimerTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/system";
import Text from "global/components/Text";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import interactionPlugin from "@fullcalendar/interaction";

// import { getSelectedCustomerUid } from "global/helpers/storageService";

const CreateScheduleDrawer2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [useEndDate, setUseEndDate] = useState(false);
  const [scheduleDay, setScheduleDay] = useState(0);
  const [scheduleTime, setScheduleTime] = useState();
  const [excludedDate, setExcludedDate] = useState();
  const [excludedDates, setExcludedDates] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [scheduleSet, setScheduleSet] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const dateDisplayOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const initialValues = {
    everyXWeeks: 1,
    startDate: "",
    endDate: "",
  };

  const CardActionsWrapper = styled(Card)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
       margin: 0 ${theme.spacing(3)};
  `
  );

  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateScheduleValidation}
      onSubmit={(values) => {
        setLoading(true);
        const updateData = async () => {
          try {
            var startDate = values.startDate?.local();

            console.log(values.endDate);
            var endDate = values.endDate ? values.endDate?.local() : null;

            var payload = {
              startDate: startDate,
              endDate: endDate,
              numberOfOccurunces: values.numberOfOccurunces ?? null,
              everyXWeeks: values.everyXWeeks,
              timeslots: timeslots,
              ignoreDates: excludedDates,
            };
            console.log("payload:", payload);
            const result = await api.apiPost(
              "test/GenerateWeeklyFixtures",
              payload,
              true,
              "Creating League",
              "League Created",
              "Could not create League"
            );
            console.log(payload, result);
            setSchedule(result.data);
            setLoading(false);
            //props.saveAndClose();
          } catch (err) {
            console.log(err);
            setLoading(false);
            // error handling here
          }
          setLoading(false);
        };
        // call the async updateData function
        updateData();
      }}
    >
      {({ values, handleChange, setFieldValue, touched, errors }) => (
        <Form>
          <Box p={3}>
            <Typography variant="h4">Manage League Schedule</Typography>
          </Box>
          <Divider />

          <Box px={3} py={2}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
              dateClick={handleDateClick}
              initialView="dayGridMonth"
            />
          </Box>

          <CardActionsWrapper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    mr: 1,
                  }}
                  color="secondary"
                  onClick={() => props.close()}
                >
                  {"Cancel"}
                </Button>

                {scheduleSet && (
                  <LoadingButton
                    variant="contained"
                    onClick={() => props.saveAndClose(schedule)}
                    loading={loading}
                    color="primary"
                  >
                    Save League Schedule
                  </LoadingButton>
                )}

                {!scheduleSet && (
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loading}
                    color="primary"
                  >
                    Generate Schedule
                  </LoadingButton>
                )}
              </Box>
            </Grid>
          </CardActionsWrapper>
        </Form>
      )}
    </Formik>
  );
};

CreateScheduleDrawer2.propTypes = {};

export default CreateScheduleDrawer2;
