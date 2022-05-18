import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRef } from "react";
import { Paper, Stack } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ErrorMessage } from "@hookform/error-message";
import { NavLink } from "react-router-dom";
import AxiosBase from "../api/AxiosBase";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [number, setNumber] = React.useState("");
  const [otp, setOtp] = React.useState("Get OTP");
  const [img, setImg] = React.useState("");
  const [password, setPassword] = React.useState("");
  const fileInput = useRef();
  const fileHandle = (e) => {
    setImg(e.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (event) => {
    if (event.password != event.confirmpassword) {
      setError("confirmpassword", {
        type: "costom",
        message: "Password don't matched",
      });
      return 0;
    }
    const data = new FormData();
    data.append("image", img);
    data.append("fname", event.firstname);
    data.append("email", event.email);
    data.append("password", event.password);
    data.append("phoneNo", number);
    data.append("lname", event.lastname);
    data.append("Otp", event.Otp);

    try {
      const call = await axios.post(
        "http://localhost:9000/route/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (call.data.code == 304) {
        setError("Otp", { type: "costom", message: "Invalid OTP" });
        throw new Error("Invalid OTP");
      } else if (call.data.code == 300) {
        setError("email", "Invalid", "Email already exists");
        throw new Error("Email already exist");
      }
      Swal.fire({
        title: "Success",
        text: "Account Created",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          window.location.href = "/";
        }
      });
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    // .catch((err) => {
    //   Swal.fire({
    //     title: "Error",
    //     text: err.data.message,
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   }).then((result) => {
    //     if (result.value) {
    //       alert(err.data.message);
    //     }
    //   });
    // });
  };
  const handleOtp = async () => {
    // const number = getValues("phoneNo");

    AxiosBase.post("/route/getOtp", {
      phoneNo: "+" + number,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(to right, #02aab0, #00cdac)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={23} sx={{ borderRadius: "20px" }}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                onClick={() => fileInput.current.click()}
                src={img ? URL.createObjectURL(img) : null}
                sx={{
                  m: 1,
                  bgcolor: "secondary.main",
                  width: "80px",
                  height: "80px",
                }}
              >
                <Stack justifyContent={"center"} alignItems="center">
                  <CameraAltRoundedIcon />
                  <Typography fontSize={10}>add image</Typography>
                </Stack>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      {...register("firstname", {
                        required: "this field is required",
                      })}
                      error={!!errors?.firstname}
                      helperText={
                        errors?.firstname ? errors.firstname.message : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="lastName"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      {...register("lastname", {
                        required: "this field is required",
                      })}
                      error={!!errors?.lastname}
                      helperText={
                        errors?.lastname ? errors.lastname.message : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={7}>
                    <PhoneInput
                      country="in"
                      inputProps={{
                        name: "phoneNo",
                        id: "phoneNo",
                        required: true,
                      }}
                      style={{ height: "60px" }}
                      inputStyle={{
                        height: "60px",
                        backgroundBlendMode: "darken",
                      }}
                      value={number}
                      onChange={(phone) => setNumber(phone)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      id="OTP"
                      label="Otp"
                      name="OtP"
                      autoComplete="OTP"
                      {...register("Otp", {
                        required: "this field is required",
                      })}
                      error={!!errors?.Otp}
                      helperText={errors?.Otp ? errors.Otp.message : null}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      onClick={() => {
                        handleOtp();
                      }}
                      sx={{ height: "100%" }}
                    >
                      Get otp
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email", {
                        required: "this field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "invalid email address",
                        },
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email ? errors.email.message : null}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "this field is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                        },
                      })}
                      error={!!errors?.password}
                      helperText={
                        errors?.password ? errors.password.message : null
                      }
                    />
                  </Grid>
                  <Grid>
                    <input
                      // {...register("image")}
                      hidden
                      component="Input"
                      ref={fileInput}
                      type="file"
                      name="picture"
                      accept="image/*"
                      onChange={fileHandle}
                      id="contained-button-file"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmpassword"
                      label=" Confirm Password"
                      type="password"
                      id="confirmpassword"
                      autoComplete="new-password"
                      {...register("confirmpassword", {
                        required: "this field is required",
                      })}
                      error={!!errors?.confirmpassword}
                      helperText={
                        errors?.confirmpassword
                          ? errors?.confirmpassword.message
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <ErrorMessage
                  errors={errors}
                  name="singleErrorInput"
                  render={({ message }) => <p>{message}</p>}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NavLink to="/" variant="body2">
                      Already have an account? Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
