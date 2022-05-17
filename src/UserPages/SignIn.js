import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

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

export default function SignIn({ setLog }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (event) => {
    axios
      .post("http://localhost:9000/route", {
        email: event.email,
        password: event.password,
      })
      .then((res) => {
        
        localStorage.setItem("token", JSON.stringify(res.data));

        setLog(true);
        navigate("/Home");
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: JSON.stringify(err.response.data.message),
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  
  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main" maxWidth="xs"> */}
      <CssBaseline />
      <Grid
        sx={{
          backgroundImage:
            "url(https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?cs=srgb&dl=pexels-fiona-art-5022849.jpg&fm=jpg)",
          height: "100vh",
          backgroundSize: "100vw 100vh",
        }}
        container
      >
        <Grid item sm={6}>
          <Paper
          // style={{ padding: "20px", height: "90vh", margin: "30px",backDropFilter: "blur(5px)",opacity: "0.8",filter: "blur(2px)" }}
          ></Paper>
        </Grid>
        <Grid
          item
          sm={6}
          display="flex"
          justifyContent={"space-evenly"}
          alignItems="center"
        >
          <Paper
            elevation={20}
            sx={{
              maxWidth: "500px",
              maxHeight: "600px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              p: "30px",
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
            <Typography mt={3} component="h1" color={"gray"} variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: "this field is required" })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "this field is required",
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            
              <Grid container>
                <Grid item xs>
                  <NavLink to="/password_reset" variant="body2">
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
                <Copyright sx={{ mt: 7, mb: 2, ml: "auto", mr: "auto" }} />
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* </Container> */}
    </ThemeProvider>
  );
}
