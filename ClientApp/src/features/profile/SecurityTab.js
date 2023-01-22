import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  Avatar,
  Switch,
  useTheme,
  styled,
} from "@mui/material";
import PasswordChangeEditForm from "./components/PasswordChangeEditForm";

function SecurityTab() {
  const theme = useTheme();
  const [changePasswordShowForm, setchangePasswordShowForm] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">
            Change your security preferences below
          </Typography>
        </Box>
        <Card>
          <List>
            {changePasswordShowForm ? (
              <PasswordChangeEditForm
                showForm={changePasswordShowForm}
                editMode={setchangePasswordShowForm}
              />
            ) : (
              <ListItem sx={{ p: 3 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: "h5", gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: "subtitle2",
                    lineHeight: 1,
                  }}
                  primary="Change Password"
                  secondary="You can change your password here"
                />
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => setchangePasswordShowForm(true)}
                >
                  Change password
                </Button>
              </ListItem>
            )}

            <Divider component="li" />
            {/* <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: "h5", gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: "subtitle2",
                  lineHeight: 1,
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem> */}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
