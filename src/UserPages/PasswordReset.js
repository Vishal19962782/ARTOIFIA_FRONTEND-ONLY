import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IconButton, Paper } from "@mui/material";
import axiosBase from "../api/AxiosBase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
        Artofia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function PasswordReset({ setLog }) {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm();
  const getOtp = () => {
    const email = getValues("email");

    axiosBase.post("/route/getOtp", { email: email }).then((res) => {
      localStorage.setItem("otpToken", res.data.token);
      setStep(2);
      Swal.fire({
        title: "OTP Sent",
        text: res.data.message,
      });
    });
  };
  const verifyOtp = async () => {
    try {
      const result = await axiosBase.post("/route/verifyOtp", {
        otp: getValues("Otp"),
        token: localStorage.getItem("otpToken"),
      });
      const token = result.data;
      // setError("email",{type:"costom",message:result.data.message});
      localStorage.setItem("tokenafterverify", token);
      Swal.fire({
        title: "Success",
        text: "OTP verified You can now change your password",
      });
      setStep(3);
    } catch (err) {
      Swal.fire({
        title: "Otp is not valid",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const changePassword = async () => {
    try {
      const pass = getValues("password");
      const cpass = getValues("confirmPassword");

      if (pass != cpass)
        throw new Error("Password and confirm password does not match");
      const result = await axiosBase
        .put("/route/changePassword", {
          password: getValues("password"),
          token: localStorage.getItem("tokenafterverify"),
        })
        .then((res) => {
          Swal.fire({
            title: "Password changed successfully",
            icon: "success",
            text: res.data.message,
          });
          // setLog(true);
          navigate("/");
        });
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #02aab0, #00cdac)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      theme={theme}
    >
      <Paper elevation={12} sx={{ p: "0px 30px 0px 30px" }}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              fontFamily={"Satisfy"}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
              variant="h2"
            >
              Artofia.
            </Typography>
            <Typography
              mt={3}
              mb={3}
              component="h1"
              color={"gray"}
              variant="h5"
            >
              Reset Password
            </Typography>
            <Grid
              component="form"
              onSubmit={handleSubmit(changePassword)}
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              spacing={2}
            >
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                  error={errors.email}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  sx={{ height: "55px" }}
                  fullWidth
                  onClick={() => {
                    getOtp();
                  }}
                >
                  Get Otp
                </Button>
              </Grid>
              {step >= 2 ? (
                <>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      placeholder="Otp"
                      {...register("Otp", {
                        required: "OTP is required to proceed",
                      })}
                      error={errors.Otp}
                      helperText={errors.Otp && errors.Otp.message}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      sx={{ height: "55px" }}
                      fullWidth
                      onClick={verifyOtp}
                    >
                      Verify otp
                    </Button>
                  </Grid>
                </>
              ) : null}
              {step >= 3 ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="New Password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain atleast one uppercase,lowercase,special character,number and atleast 8 characters",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="New Password"
                      {...register("confirmPassword")}
                    />
                  </Grid>
                  {/* <Grid container> */}
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" fullWidth>
                      Change Password
                    </Button>
                  </Grid>
                  {/* </Grid> */}
                </>
              ) : null}
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Paper>
    </Box>
  );
}
