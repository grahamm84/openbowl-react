import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useState, useContext } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Text from "global/components/Text";
import Label from "global/components/Label";
import ProfileInformationEdit from "./ProfileInformationEdit";
import { UserProfileContext } from "global/layouts/LoggedInLayout/LoggedInLayout";
import { ClearTwoTone } from "@mui/icons-material";

function ProfileInformationView() {
  const [editMode, setEditMode] = useState(false);
  const [user, getProfile] = useContext(UserProfileContext);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {editMode ? (
          <ProfileInformationEdit
            editMode={setEditMode}
            getProfile={getProfile}
          />
        ) : (
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Personal Details
                </Typography>
                <Typography variant="subtitle2">
                  Manage informations related to your personal details
                </Typography>
              </Box>

              <Button
                variant="text"
                startIcon={<EditTwoToneIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{user.name}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Allow Extra Emails:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {user.allowExtraEmails ? (
                      <Label color="success">
                        <DoneTwoToneIcon fontSize="small" />
                        <b>Yes</b>
                      </Label>
                    ) : (
                      <Label color="error">
                        <ClearTwoTone fontSize="small" />
                        <b>No</b>
                      </Label>
                    )}
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export default ProfileInformationView;
