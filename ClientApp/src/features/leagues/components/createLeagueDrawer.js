import _ from "lodash";
import { Formik, Form } from "formik";
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
} from "@mui/material";
import * as api from "global/apiClient";
import { LoadingButton } from "@mui/lab";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { CreateLeagueValidation } from "./createLeagueValidation";
// import { getSelectedCustomerUid } from "global/helpers/storageService";

const CreateLeagueDrawer = (props) => {
  const [loading, setLoading] = useState(false);
  const [privateLeague, setPrivateLeague] = useState(false);
  const [openLeague, setOpenLeague] = useState(false);

  const initialValues = {
    leagueName: "",
    teamPlayerCount: "",
    startingTeamCount: "",
  };

  const CardActionsWrapper = styled(Card)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
       margin: 0 ${theme.spacing(3)};
  `
  );

  //   var customerUid = getSelectedCustomerUid();
  //   console.log(customerUid);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateLeagueValidation}
      onSubmit={(values) => {
        setLoading(true);
        const updateData = async () => {
          try {
            var appToCreate = {
              leagueName: values.leagueName,
              teamPlayerCount: values.teamPlayerCount,
              startingTeamCount: values.startingTeamCount,
              privateLeague: privateLeague,
              openLeague: openLeague,
            };
            await api.apiPost(
              "my-leagues",
              appToCreate,
              true,
              "Creating League",
              "League Created",
              "Could not create League"
            );
            console.log(appToCreate);
            props.saveAndClose();
          } catch (err) {
            // error handling here
          }
          setLoading(false);
        };
        // call the async updateData function
        updateData();
      }}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Box p={3}>
            <Typography variant="h4">Create League</Typography>
          </Box>
          <Divider />
          <Box px={3} py={2}>
            <FormikTextField
              size="medium"
              name="leagueName"
              fullWidth
              margin="normal"
              formikKey="leagueName"
              label="League Name"
              autoComplete="leagueName"
            />

            <TextField
              select
              name="teamPlayerCount"
              size="medium"
              fullWidth
              margin="normal"
              variant="outlined"
              id="teamPlayerCount"
              label="Team Types"
              value={values.teamPlayerCount}
              onChange={handleChange}
              error={touched.teamPlayerCount && Boolean(errors.teamPlayerCount)}
              helperText={touched.teamPlayerCount && errors.teamPlayerCount}
            >
              <MenuItem key="singles" value="1">
                Singles (1)
              </MenuItem>
              <MenuItem key="doubles" value="2">
                Doubles (2)
              </MenuItem>
              <MenuItem key="trios" value="3">
                Trios (3)
              </MenuItem>
              <MenuItem key="four" value="4">
                Four (4)
              </MenuItem>
            </TextField>

            <TextField
              select
              name="startingTeamCount"
              size="medium"
              fullWidth
              margin="normal"
              variant="outlined"
              id="startingTeamCount"
              label="Starting Number of Teams"
              value={values.startingTeamCount}
              onChange={handleChange}
              error={
                touched.startingTeamCount && Boolean(errors.startingTeamCount)
              }
              helperText={touched.startingTeamCount && errors.startingTeamCount}
            >
              <MenuItem key="1" value="1">
                1
              </MenuItem>
              <MenuItem key="2" value="2">
                2
              </MenuItem>
              <MenuItem key="3" value="3">
                3
              </MenuItem>
              <MenuItem key="4" value="4">
                4
              </MenuItem>
              <MenuItem key="5" value="5">
                5
              </MenuItem>
              <MenuItem key="6" value="6">
                6
              </MenuItem>
              <MenuItem key="7" value="7">
                7
              </MenuItem>
              <MenuItem key="8" value="8">
                8
              </MenuItem>
              <MenuItem key="9" value="9">
                9
              </MenuItem>
              <MenuItem key="10" value="10">
                10
              </MenuItem>
              <MenuItem key="11" value="11">
                11
              </MenuItem>
              <MenuItem key="12" value="12">
                12
              </MenuItem>
            </TextField>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={privateLeague}
                    onChange={() => setPrivateLeague(!privateLeague)}
                  />
                }
                label="Private League - Enable this to hide your league from Global Searches"
              />
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={openLeague}
                    onChange={() => setOpenLeague(!openLeague)}
                  />
                }
                label="Open League - Is your league open to new teams joining currently?"
              />
            </Box>

            <Box mt={2}>
              <Alert severity="info">
                You will need to set your league schedule after creation before
                your league is ready to use.
              </Alert>
            </Box>
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
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                  color="primary"
                >
                  Add League
                </LoadingButton>
              </Box>
            </Grid>
          </CardActionsWrapper>
        </Form>
      )}
    </Formik>
  );
};

CreateLeagueDrawer.propTypes = {};

export default CreateLeagueDrawer;
