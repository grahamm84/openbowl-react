import React from "react";
import { Grid, Box } from "@mui/material";
import Text from "global/components/Text";
import PropTypes from "prop-types";

const PropertyValueDisplay = (props) => {
  if (props.propertyValue) {
    return (
      <Text color="black">
        <b>{props.propertyValue}</b>
      </Text>
    );
  }
  if (props.propertyComponent) {
    return props.propertyComponent;
  }

  return <></>;
};
function PropertyAndValueDisplay(props) {
  return (
    <>
      <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
        <Box pr={3} pb={2}>
          {props.propertyLabel}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <PropertyValueDisplay
          propertyValue={props.propertyValue}
          propertyComponent={props.propertyComponent}
        />
      </Grid>
    </>
  );
}

PropertyAndValueDisplay.propTypes = {
  propertyLabel: PropTypes.string.isRequired,
  propertyValue: PropTypes.string,
  propertyComponent: PropTypes.object,
};

PropertyValueDisplay.propTypes = {
  propertyValue: PropTypes.string,
  propertyComponent: PropTypes.object,
};
export default PropertyAndValueDisplay;
