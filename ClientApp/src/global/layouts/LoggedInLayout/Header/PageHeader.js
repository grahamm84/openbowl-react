import React from "react";
import PropTypes from "prop-types";
import { Box, Container, styled, Typography } from "@mui/material";

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);
function PageHeader(props) {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h3" gutterBottom>
          {props.title}
        </Typography>
        {props.subtitle ? (
          <Typography variant="subtitle2">{props.subtitle}.</Typography>
        ) : undefined}
      </Container>
    </PageTitle>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
