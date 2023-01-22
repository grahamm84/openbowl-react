import React from "react";
import { useAuth } from "global/useAuth";
import PropTypes from "prop-types";

function PermissionWrapperVisibility(props) {
  const auth = useAuth();
  let doIHavePermission = false;
  if (props.permissions) {
    doIHavePermission = auth.doIHavePermission(props.permissions);
  }

  if (doIHavePermission) {
    return props.children;
  }

  return <React.Fragment></React.Fragment>;
}

export default PermissionWrapperVisibility;

PermissionWrapperVisibility.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.array,
};
