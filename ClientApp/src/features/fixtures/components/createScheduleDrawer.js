import _ from "lodash";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
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
import {
  DateTimePicker,
  DatePicker,
  TimePicker,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { CreateScheduleValidation } from "./createScheduleValidation";
import { CalendarTodayTwoTone, TimerTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/system";
import Text from "global/components/Text";
import moment from "moment";
// import { getSelectedCustomerUid } from "global/helpers/storageService";

const CreateScheduleDrawer = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [useEndDate, setUseEndDate] = useState(false);
  const [scheduleDay, setScheduleDay] = useState(0);
  const [scheduleTime, setScheduleTime] = useState();
  const [excludedDate, setExcludedDate] = useState();
  const [excludedDates, setExcludedDates] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [scheduleSet, setScheduleSet] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [savedPayload, setSavedPayload] = useState();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  console.log(`timezone: ${timeZone} Current Date: ${new Date()}`);
  let currentDate = new Date();
  console.log(currentDate);

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

  const GetDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const SetDay = (day) => {
    setScheduleDay(day.target.value);
    setScheduleSet(false);
  };
  const AddTimeSlot = () => {
    var time = scheduleTime;
    const date = new Date(time);
    var timeslot = {
      day: scheduleDay,
      hour: date.getHours(),
      minute: date.getMinutes(),
    };

    var exists = timeslots.filter(
      (x) =>
        x.day === timeslot.day &&
        x.hour === timeslot.hour &&
        x.minute === timeslot.minute
    );
    if (exists.length === 0) {
      setTimeslots((timeslots) => timeslots.concat(timeslot));
      setScheduleSet(false);
    }
    console.log("timeslot", timeslot);
  };

  const AddDateExclusion = () => {
    console.log("add date exlusion called", excludedDate, excludedDates);
    if (excludedDate === undefined || excludedDate === null) {
      return;
    }
    var day = excludedDate.startOf("day");
    var exists = excludedDates.filter((x) => x === day);
    console.log("does it exist?", exists);
    if (exists.length === 0) {
      setExcludedDates((excludedDates) => excludedDates.concat(day));
      setScheduleSet(false);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    console.log("to delete:", chipToDelete.key, chipToDelete);
    setExcludedDates((excludedDates) =>
      excludedDates.filter((e) => e !== chipToDelete)
    );
  };

  const handleTimeslotDelete = (chipToDelete) => () => {
    console.log("to delete:", chipToDelete.key, chipToDelete);
    setTimeslots((timeslots) => timeslots.filter((e) => e !== chipToDelete));
    setScheduleSet(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateScheduleValidation}
      onSubmit={(values) => {
        setLoading(true);
        const updateData = async () => {
          try {
            var endDate = values.endDate ? values.endDate : null;
            setSchedule([]);
            setSavedPayload(null);

            var payload = {
              startDate: startDate,
              endDate: endDate,
              numberOfOccurunces: values.numberOfOccurunces ?? null,
              everyXWeeks: values.everyXWeeks,
              timeslots: timeslots,
              ignoreDates: excludedDates,
              timezone: timeZone,
              localTime: currentDate,
            };
            console.log("payload:", payload);
            const result = await api.apiPost(
              `schedule/${params.leagueUid}/preview`,
              payload,
              true,
              "Creating League",
              "League Created",
              "Could not create League"
            );
            console.log(payload, result);
            setSchedule(result.data);
            setScheduleSet(true);
            setLoading(false);
            setSavedPayload(payload);
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
      {({
        values,
        handleChange,
        setFieldValue,
        setFieldTouched,
        touched,
        errors,
      }) => (
        <Form>
          <Box p={3}>
            <Typography variant="h4">Manage League Schedule</Typography>
          </Box>
          <Divider />

          <Box px={3} py={2}>
            <TextField
              select
              name="everyXWeeks"
              size="medium"
              fullWidth
              margin="normal"
              variant="outlined"
              id="everyXWeeks"
              label="Fixture Frequency"
              value={values.everyXWeeks}
              // onChange={handleChange}
              onChange={(e) => {
                setFieldValue("everyXWeeks", e.target.value);
                setScheduleSet(false);
              }}
              error={touched.everyXWeeks && Boolean(errors.everyXWeeks)}
              helperText={touched.everyXWeeks && errors.everyXWeeks}
            >
              <MenuItem key="week" value="1">
                Every Week
              </MenuItem>
              <MenuItem key="2-week" value="2">
                Every 2 Weeks
              </MenuItem>
              <MenuItem key="3-week" value="3">
                Every 3rd Week
              </MenuItem>
              <MenuItem key="4-week" value="4">
                Every 4th Week
              </MenuItem>
            </TextField>

            <Box mt={2}>
              <MobileDatePicker
                value={values.startDate}
                format="dddd, MMMM Do YYYY"
                onChange={(date) => {
                  setFieldValue("startDate2", date.startOf("day"));
                  setScheduleSet(false);
                  setStartDate(date);
                }}
                label={"Schedule start date"}
                slotProps={{
                  textField: {
                    margin: "normal",
                    variant: "outlined",
                    fullWidth: true,
                    name: "startDate",
                  },
                }}
                // renderInput={(params) => (
                //   <TextField
                //     {...params}
                //     margin="normal"
                //     variant="outlined"
                //     fullWidth
                //     name="startDate"
                //   />
                // )}
              />
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useEndDate}
                    onChange={() => {
                      setUseEndDate(!useEndDate);
                      setScheduleSet(false);
                    }}
                  />
                }
                label="Use an End Date for this schedule"
              />
            </Box>

            {useEndDate && (
              <Box mt={2}>
                <MobileDatePicker
                  value={values.endDate}
                  format="dddd, MMMM Do YYYY"
                  onChange={(date) => {
                    console.log("date selected:", date, date.toDateString());
                    setFieldValue("endDate", date.startOf("day"));
                    setScheduleSet(false);
                  }}
                  label={"Event end date"}
                  slotProps={{
                    textField: {
                      margin: "normal",
                      variant: "outlined",
                      fullWidth: true,
                      name: "endDate",
                    },
                  }}
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     margin="normal"
                  //     variant="outlined"
                  //     fullWidth
                  //     name="endDate"
                  //   />
                  // )}
                />
              </Box>
            )}

            {!useEndDate && (
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    name="numberOfOccurunces"
                    size="medium"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="numberOfOccurunces"
                    label="Number of scheduled events"
                    value={values.numberOfOccurunces}
                    // onChange={handleChange}
                    onChange={(e) => {
                      setScheduleSet(false);
                      setFieldValue("numberOfOccurunces", e.target.value);
                    }}
                    error={
                      touched.numberOfOccurunces &&
                      Boolean(errors.numberOfOccurunces)
                    }
                    helperText={
                      touched.numberOfOccurunces && errors.numberOfOccurunces
                    }
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </Grid>

                {props.teamCount > 1 && (
                  <>
                    <Grid item xs={2}>
                      <Box mt={4} ml={3}>
                        <Typography>OR</Typography>{" "}
                      </Box>
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        name="playEachTeamXTimes"
                        size="medium"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        id="playEachTeamXTimes"
                        label="Play Each Team X Times"
                        value={values.playEachTeamXTimes}
                        // onChange={handleChange}
                        onChange={(e) => {
                          setScheduleSet(false);
                          setFieldValue("playEachTeamXTimes", e.target.value);
                          setFieldValue(
                            "numberOfOccurunces",
                            (props.teamCount - 1) * e.target.value
                          );
                          // mark the numberOfOccurunces field as touched
                          setFieldTouched("numberOfOccurunces", true, false);
                        }}
                        error={
                          touched.numberOfOccurunces &&
                          Boolean(errors.numberOfOccurunces)
                        }
                        helperText={
                          touched.numberOfOccurunces &&
                          errors.numberOfOccurunces
                        }
                        type="number"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      />
                    </Grid>
                  </>
                )}

                {!props.teamCount && (
                  <Grid item xs={5}>
                    <Box m={2}>
                      <Typography variant="body2">
                        {props.teamCount && (
                          <Text>
                            Team Count: {props.teamCount} eg: Play each team
                            once - {props.teamCount - 1} events, twice ={" "}
                            {(props.teamCount - 1) * 2} events, three times ={" "}
                            {(props.teamCount - 1) * 3} events, 4 times ={" "}
                            {(props.teamCount - 1) * 4} events etc
                          </Text>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {/* </Grid> */}
              </Grid>
            )}

            <Box p={3}>
              <Typography variant="h4">Time Slots</Typography>
            </Box>
            <Divider />

            <Stack>
              <TextField
                select
                name="scheduleDay"
                size="medium"
                margin="normal"
                variant="outlined"
                id="scheduleDay"
                label="Day of Week"
                value={scheduleDay}
                onChange={SetDay}
                error={touched.scheduleDay && Boolean(errors.scheduleDay)}
                helperText={touched.scheduleDay && errors.scheduleDay}
              >
                <MenuItem key="sunday" value={0}>
                  Sunday
                </MenuItem>
                <MenuItem key="monday" value={1}>
                  Monday
                </MenuItem>
                <MenuItem key="tuesday" value={2}>
                  Tuesday
                </MenuItem>
                <MenuItem key="wednesday" value={3}>
                  Wednesday
                </MenuItem>
                <MenuItem key="thursday" value={4}>
                  Thursday
                </MenuItem>
                <MenuItem key="friday" value={5}>
                  Friday
                </MenuItem>
                <MenuItem key="saturday" value={6}>
                  Saturday
                </MenuItem>
              </TextField>

              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <MobileTimePicker
                  onChange={(time) => setScheduleTime(time)}
                  slotProps={{
                    textField: {
                      margin: "normal",
                      variant: "outlined",
                      fullWidth: true,
                      name: "timeSlot",
                    },
                  }}
                />
                <Box ml={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={AddTimeSlot}
                  >
                    Add Timeslot
                  </Button>
                </Box>
              </Stack>
            </Stack>

            <Box mt={2}>
              {timeslots?.map((d, index) => {
                return (
                  <Chip
                    key={`${d.day}${d.hour}${d.minute}`}
                    label={`${GetDay(d.day)} @ ${d.hour}:${d.minute}`}
                    onDelete={handleTimeslotDelete(d)}
                    icon={<TimerTwoTone />}
                  />
                );
              })}
            </Box>

            <Box p={3}>
              <Typography variant="h4">Exclude Dates</Typography>
            </Box>
            <Divider />

            <Stack>
              <Box mt={2} mb={2}>
                <Text>
                  You can add specific dates to exlude from the schedule now, or
                  you can adjust your fixtures later
                </Text>
              </Box>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <MobileDatePicker
                  onChange={(date) => setExcludedDate(date.startOf("day"))}
                  format="dddd, MMMM Do YYYY"
                  value={excludedDate}
                  label={"Exclude date"}
                  slotProps={{
                    textField: {
                      margin: "normal",
                      variant: "outlined",
                      fullWidth: true,
                      name: "excludeDate",
                    },
                  }}
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     margin="normal"
                  //     variant="outlined"
                  //     fullWidth
                  //     name="excludeDate"
                  //   />
                  // )}
                />

                <Box ml={2}>
                  <Button
                    onClick={AddDateExclusion}
                    variant="contained"
                    color="secondary"
                  >
                    Add Date to Exclude
                  </Button>
                </Box>
              </Stack>

              {console.log("excludedDates", excludedDates)}

              {excludedDates.length === 0 && (
                <Box mt={2}>
                  <Text>No Dates currently excluded from the calendar</Text>
                </Box>
              )}
            </Stack>

            <Box mt={2}>
              {excludedDates?.map((d, index) => {
                var date = new Date(d);
                return (
                  <Chip
                    key={d}
                    label={date.toLocaleDateString(
                      undefined,
                      dateDisplayOptions
                    )}
                    onDelete={handleDelete(d)}
                    icon={<CalendarTodayTwoTone />}
                  />
                );
              })}
            </Box>

            <Box p={3}>
              <Typography variant="h4">Bowling Dates</Typography>
            </Box>
            <Divider />
            {console.log("schedule", schedule)}
            {console.log("scheduleSet", scheduleSet)}
            {schedule.length > 0 &&
              schedule?.map((d, index) => {
                console.log("d", d);
                var date = new Date(d);
                return (
                  <Chip
                    key={d}
                    label={`${date.toLocaleString(
                      undefined,
                      dateDisplayOptions
                    )}  @ ${date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}`}
                    //onDelete={handleDelete(d)}
                    icon={<CalendarTodayTwoTone />}
                  />
                );
              })}
            {!schedule.length && (
              <Text variant="body2">No Dates generated yet.</Text>
            )}
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
                    onClick={() => props.saveAndClose(schedule, savedPayload)}
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

CreateScheduleDrawer.propTypes = {};

export default CreateScheduleDrawer;
