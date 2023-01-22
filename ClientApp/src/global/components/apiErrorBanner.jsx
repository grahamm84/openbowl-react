import React from "react";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { Box } from "@mui/material";
export default function ApiErrorBanner(props) {
  if (props.errors) {
    return (
      <Alert severity="error">
        {props.title ? <AlertTitle>{props.title}</AlertTitle> : <></>}
        {props.errors?.general?.map((err, index) => {
          return <Typography key={index}>{err}</Typography>;
        })}
      </Alert>
    );
  }
  return null;
}
