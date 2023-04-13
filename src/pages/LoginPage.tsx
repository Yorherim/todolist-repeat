import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";

import { authActions, authSelectors } from "../state/auth";
import { useActions } from "../hooks/useActions";

export const LoginPage: React.FC = () => {
  const { loginTC } = useActions(authActions);
  const isLoggedIn = useSelector(authSelectors.getAuthIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      checkbox: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(2, "Password must be more 2 characters")
        .required("Required"),
      checkbox: Yup.boolean(),
    }),
    onSubmit: (values) => {
      loginTC(values);
      formik.resetForm();
    },
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  if (isLoggedIn) {
    return <Navigate to="/todolist-repeat/" />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                id="email"
                type="email"
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
                error={!!(formik.touched.email && formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "rgb(211, 47, 47)" }}>
                  {formik.errors.email}
                </div>
              ) : null}

              <TextField
                id="password"
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
                error={!!(formik.touched.password && formik.errors.password)}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "rgb(211, 47, 47)" }}>
                  {formik.errors.password}
                </div>
              ) : null}

              <FormControlLabel
                id="checkbox"
                label={"Remember me"}
                control={<Checkbox />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
