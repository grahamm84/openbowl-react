import React from "react";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

export default function ContentContainer(props) {
  return (
    <>
      <PageHeader
        title={props.title}
        subtitle={props.subtitle}
        icon={props.icon}
        action={props.action}
      />
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          {props.children}
        </Grid>
      </Container>
    </>
  );
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
};
