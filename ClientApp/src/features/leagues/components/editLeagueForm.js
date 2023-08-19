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

const EditLeagueForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [privateLeague, setPrivateLeague] = useState(
    props.selectedLeague.privateLeague ?? false
  );
  const [openLeague, setOpenLeague] = useState(
    props.selectedLeague.openLeague ?? false
  );

  const initialValues = {
    leagueUid: props.selectedLeague.leagueUid ?? "",
    leagueName: props.selectedLeague.leagueName ?? "",
    leagueIntroduction: props.selectedLeague.leagueIntroduction ?? "",
    teamPlayerCount: props.selectedLeague.playersPerTeam ?? "",
    startingTeamCount: props.selectedLeague.startingTeams ?? "",
  };

  const CardActionsWrapper = styled(Card)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
       margin: 0 ${theme.spacing(3)};
  `
  );

  console.log(props);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateLeagueValidation}
      onSubmit={(values) => {
        setLoading(true);
        const updateData = async () => {
          try {
            var leagueToEdit = {
              leagueUid: values.leagueUid,
              leagueName: values.leagueName,
              leagueIntroduction: values.leagueIntroduction,
              privateLeague: privateLeague,
              openLeague: openLeague,
            };
            await api.apiPost(
              `leagues/${values.leagueUid}/edit`,
              leagueToEdit,
              true,
              "Updating League",
              "League Updated",
              "Could not update League"
            );
            console.log(leagueToEdit);
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
            <Typography variant="h4">Edit League</Typography>
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

            <FormikTextField
              size="medium"
              name="leagueIntroduction"
              fullWidth
              margin="normal"
              formikKey="leagueIntroduction"
              label="League Introduction Text"
              autoComplete="leagueIntroduction"
            />

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
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                  color="primary"
                >
                  Edit League
                </LoadingButton>
              </Box>
            </Grid>
          </CardActionsWrapper>
        </Form>
      )}
    </Formik>
  );
};

EditLeagueForm.propTypes = {};

export default EditLeagueForm;
