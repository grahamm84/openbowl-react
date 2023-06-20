import { React, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, Drawer } from "@mui/material";
import ScoreTwoTone from "@mui/icons-material/ScoreTwoTone";
import Text from "global/components/Text";
import * as api from "global/apiClient";
import PermissionWrapperVisibility from "global/components/PermissionWrapper";
import { Stack } from "@mui/system";
import CreateScheduleDrawer2 from "features/fixtures/components/createScheduleDrawer2";
import CreateScheduleDrawer from "features/fixtures/components/createScheduleDrawer";
import { useParams } from "react-router-dom";

export default function AdminGenerateFixtures(props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const params = useParams();

  const saveScheduleData = async (scheduleData, scheduleItems) => {
    console.log("save schedule called", scheduleData, scheduleItems);
    setLoading(true);
    try {
      var payload = {
        scheduleDefinition: scheduleData,
        schedule: scheduleItems,
      };

      await api.apiPost(
        `schedule/${params.leagueUid}/save-schedule`,
        payload,
        true,
        "Saving League Schedule",
        "Request Completed",
        "Error with saving Schedule"
      );
      props.editMode(false);
    } catch (err) {
      console.log("save schedule error", err);
      // error handling code
    }
    setLoading(false);
  };

  const closeDrawer = () => {
    console.log("close drawer");
    setEdit(false);
  };

  const closeDrawerAndSave = (schedule, savedPayload) => {
    console.log("close drawer and save", schedule, savedPayload);
    saveScheduleData(savedPayload, schedule).then(() => {
      setEdit(false);
    });
    //setLeaguesUpdated(setLeaguesUpdated + 1);
  };

  const openDrawer = () => {
    console.log("open drawer");
    setEdit(true);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <PermissionWrapperVisibility permissions={"league.admin"}>
          <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Generate Fixtures
          </Button>
        </PermissionWrapperVisibility>
      </Box>

      <Drawer
        PaperProps={{
          sx: { width: "45%" },
        }}
        variant="temporary"
        anchor="right"
        onClose={closeDrawer}
        open={edit}
        elevation={9}
      >
        {edit && (
          <CreateScheduleDrawer
            teamCount={props.teamCount}
            close={closeDrawer}
            saveAndClose={closeDrawerAndSave}
          />
        )}
      </Drawer>
    </>
  );
}
