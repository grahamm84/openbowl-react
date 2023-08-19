import { useEffect, useState, useRef, React } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as api from "global/apiClient";
import {
  Grid,
  Tooltip,
  Box,
  styled,
  useTheme,
  Switch,
  FormControlLabel,
  Card,
} from "@mui/material";
import { EditTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";

const CardActionsWrapper = styled(Card)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
       margin: 0 ${theme.spacing(3)};
  `
);
export default function PlayerEditForm(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(props?.player?.isActive ?? true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = () => {
    props.refreshOnUpdate();
  };

  const theme = useTheme();

  const initialValues = {
    firstName: props.player?.firstName ?? "",
    lastName: props.player?.lastName ?? "",
    displayName: props.player?.displayName ?? "",
    nickname: props.player?.nickname ?? "",
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Tooltip title="Edit Player" arrow>
          <Button
            size="small"
            onClick={handleClickOpen}
            variant="text"
            color="secondary"
            startIcon={<EditTwoTone />}
            sx={{
              alignSelf: "center",
              padding: `${theme.spacing(0.5, 1.6, 0.5, 1.2)}`,
              backgroundColor: `${theme.colors.secondary.lighter}`,
              textTransform: "uppercase",
              fontSize: `${theme.typography.pxToRem(11)}`,
              "&:hover": {
                backgroundColor: `${theme.colors.secondary.main}`,
                color: `${theme.palette.getContrastText(
                  theme.colors.secondary.main
                )}`,
              },
            }}
          >
            Edit
          </Button>
        </Tooltip>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>Edit Player</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the player's information below.
            </DialogContentText>
            <Box mt={1}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  console.log("values", values);
                  setLoading(true);
                  const updateData = async () => {
                    try {
                      var playerToEdit = {
                        playerUid: props.player.playerUid,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        displayName: values.displayName,
                        nickname: values.nickname,
                        isActive: isActive,
                      };
                      await api.apiPost(
                        `players/${props.player.playerUid}`,
                        playerToEdit,
                        true,
                        "Updating Player",
                        "PLayer Updated",
                        "Could not update Player"
                      );
                      console.log(playerToEdit);
                      props.saveAndClose();
                    } catch (err) {
                      console.error("error:", err); // error handling here
                    }
                    setLoading(false);
                  };
                  updateData();
                  handleSaveAndClose();
                }}
              >
                {({ values, handleChange, touched, errors }) => (
                  <Form>
                    <FormikTextField
                      size="medium"
                      name="firstName"
                      fullWidth
                      margin="normal"
                      formikKey="firstName"
                      label="First Name"
                      autoComplete="firstName"
                    />
                    <FormikTextField
                      size="medium"
                      name="lastName"
                      fullWidth
                      margin="normal"
                      formikKey="lastName"
                      label="Last Name"
                      autoComplete="lastName"
                    />
                    <FormikTextField
                      size="medium"
                      name="displayName"
                      fullWidth
                      margin="normal"
                      formikKey="displayName"
                      label="Display Name"
                      autoComplete="displayName"
                    />

                    <FormikTextField
                      size="medium"
                      name="nickname"
                      fullWidth
                      margin="normal"
                      formikKey="nickname"
                      label="Nickname"
                      autoComplete="nickname"
                    />

                    <FormikTextField
                      size="medium"
                      name="handicap"
                      margin="normal"
                      formikKey="handicap"
                      label="Overide Handicap"
                      autoComplete="handicap"
                    />

                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                          />
                        }
                        label="Enabled User"
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
                          <LoadingButton
                            sx={{
                              mr: 1,
                            }}
                            variant="outlined"
                            onClick={handleClose}
                            loading={loading}
                            color="primary"
                          >
                            Cancel
                          </LoadingButton>
                          <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loading}
                            color="primary"
                          >
                            Update Player
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </CardActionsWrapper>
                  </Form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
}
