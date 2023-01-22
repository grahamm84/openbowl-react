import React from "react";
import { Form } from "formik";

export default function AuthPagesForm(props) {
  return <Form>{props.children}</Form>;
}
