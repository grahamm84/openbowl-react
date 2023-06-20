import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Grid,
  Drawer,
  Box,
  Card,
  Divider,
  useMediaQuery,
  styled,
  useTheme,
} from "@mui/material";

//import { useDispatch, useSelector } from "src/store";

// import {
//   getEvents,
//   updateEvent,
//   selectEvent,
//   selectRange,
//   openDrawerPanel,
//   closeDrawerPanel,
// } from "src/slices/calendar";

// import Actions from "./Actions";
import CalendarActions from "./calendarActions";
// import EventDrawer from "./EventDrawer";

const FullCalendarWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};

    & .fc-license-message {
      display: none;
    }
    .fc {

      .fc-col-header-cell {
        padding: ${theme.spacing(1)};
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-scrollgrid {
        border: 2px solid ${theme.colors.alpha.black[10]};
        border-right-width: 1px;
        border-bottom-width: 1px;
      }

      .fc-cell-shaded,
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-list-event-graphic {
        padding-right: ${theme.spacing(1)};
      }

      .fc-theme-standard td, .fc-theme-standard th,
      .fc-col-header-cell {
        border: 1px solid ${theme.colors.alpha.black[10]};
      }

      .fc-event {
        padding: ${theme.spacing(0.1)} ${theme.spacing(0.3)};
      }

      .fc-list-day-side-text {
        font-weight: normal;
        color: ${theme.colors.alpha.black[70]};
      }

      .fc-list-event:hover td,
      td.fc-daygrid-day.fc-day-today {
        background-color: ${theme.colors.primary.lighter};
      }

      td.fc-daygrid-day:hover,
      .fc-highlight {
        background: ${theme.colors.alpha.black[10]};
      }

      .fc-daygrid-dot-event:hover, 
      .fc-daygrid-dot-event.fc-event-mirror {
        background: ${theme.colors.primary.lighter};
      }

      .fc-daygrid-day-number {
        padding: ${theme.spacing(1)};
        font-weight: bold;
      }

      .fc-list-sticky .fc-list-day > * {
        background: ${theme.colors.alpha.black[5]} !important;
      }

      .fc-cell-shaded, 
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[10]} !important;
        color: ${theme.colors.alpha.black[70]} !important;
      }

      &.fc-theme-standard td, 
      &.fc-theme-standard th,
      &.fc-theme-standard .fc-list {
        border-color: ${theme.colors.alpha.black[30]};
      }
    }
`
);

// const selectedEventSelector = (state) => {
//   const { events, selectedEventId } = state.calendar;

//   if (selectedEventId) {
//     return events.find((_event) => _event.id === selectedEventId);
//   }
//   return null;
// };

export default function FixtureCalendar(props) {
  const theme = useTheme();

  const calendarRef = useRef(null);
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  //const dispatch = useDispatch();
  //   const { events, isDrawerOpen, selectedRange } = useSelector(
  //     (state) => state.calendar
  //   );

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //   const selectedEvent = useSelector(selectedEventSelector);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(mobile ? "listWeek" : "dayGridMonth");

  const handleDateToday = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.today();
      setDate(calApi.getDate());
    }
  };

  const changeView = (changedView) => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.changeView(changedView);
      setView(changedView);
    }
  };

  const handleDatePrev = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.prev();
      setDate(calApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();

      calApi.next();
      setDate(calApi.getDate());
    }
  };

  //   const handleAddClick = () => {
  //     dispatch(openDrawerPanel());
  //   };

  //   const handleRangeSelect = (arg) => {
  //     const calItem = calendarRef.current;

  //     if (calItem) {
  //       const calApi = calItem.getApi();

  //       calApi.unselect();
  //     }

  //     //dispatch(selectRange(arg.start, arg.end));
  //   };

  const handleEventSelect = (arg) => {
    console.log("event selected", arg, arg.event, arg.event.id);
    //dispatch(selectEvent(arg.event.id));
  };

  useEffect(() => {
    var localEvents = [];
    console.log("what is props?", props);

    var eventList = props.events?.map((scheduleItem) => {
      return {
        scheduleId: scheduleItem.definition.id,
        events: scheduleItem.eventsUtc,
      };
    });

    var justEvents = eventList.map((item) => {
      return item.events.map((event) => {
        return {
          title: `${item.scheduleId}-${event.id}`,
          start: `${event.eventTimeUtc}Z`,
        };
      });
    });

    var flatEvents = justEvents.flat();
    setEvents(flatEvents);

    console.log("what is eventList?", eventList, justEvents, flatEvents);

    const calItem = calendarRef.current;

    if (calItem) {
      const calApi = calItem.getApi();
      const changedView = mobile ? "listWeek" : "dayGridMonth";

      calApi.changeView(changedView);
      setView(changedView);
    }
  }, [mobile]);

  return (
    <>
      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <CalendarActions
                date={date}
                onNext={handleDateNext}
                onPrevious={handleDatePrev}
                onToday={handleDateToday}
                changeView={changeView}
                view={view}
              />
            </Box>
            <Divider />
            <FullCalendarWrapper>
              <FullCalendar
                allDayMaintainDuration
                initialDate={date}
                initialView={view}
                //droppable
                //editable
                eventDisplay="block"
                eventClick={handleEventSelect}
                //eventDrop={handleEventDrop}
                dayMaxEventRows={4}
                eventResizableFromStart
                //eventResize={handleEventResize}
                events={events}
                headerToolbar={false}
                height={660}
                ref={calendarRef}
                rerenderDelay={10}
                //select={handleRangeSelect}
                selectable
                weekends
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
              />
            </FullCalendarWrapper>
          </Card>
        </Grid>
      </Grid>

      {/* <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "left" : "right"}
        onClose={closeDrawer}
        open={isDrawerOpen}
        elevation={9}
      >
        {isDrawerOpen && (
          <EventDrawer
            event={selectedEvent}
            range={selectedRange}
            onAddComplete={closeDrawer}
            onCancel={closeDrawer}
            onDeleteComplete={closeDrawer}
            onEditComplete={closeDrawer}
          />
        )}
      </Drawer> */}
    </>
  );
}
