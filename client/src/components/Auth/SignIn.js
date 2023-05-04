import * as React from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../Context/LoginContext";
import { DrawerContext } from "../../Context/DrawerContext";
import Cookies from "js-cookie";

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
        Bluestar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const setUserProfile = (data) => {
    setProfile({
      name: data.name,
      phone: data.phoneNumber,
      email: data.email,
      password: "",
      addr: data.address,
      cart: data.cart,
      library: data.libraryGames,
    });
  };
  //const cookies = Cookies();
  const googlelogin = useGoogleLogin({
    onSuccess: async (user) => {
      console.log(user);
      const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/google-login`;
      const res = await axios.post(url, { user });
      setUserProfile(res.data);
      Cookies.remove("token");
      Cookies.set("token", String(res.data.token), {
        path: "/",
        expires: 1 / 288,
      });
      setDrawer(true);
      navigate("/profile/account");
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const { setDrawer } = useContext(DrawerContext);
  const navigate = useNavigate();
  const { setProfile } = useContext(LoginContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/login`;
    //alert(url);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const res = await axios.post(url, {
        email: data.get("email"),
        password: data.get("password"),
      });

      if (res) {
        //console.log(res);
        setUserProfile(res.data);
        console.log(typeof res.data.token);
        console.log("C:" + Cookies.get());
        Cookies.remove("token");
        Cookies.set("token", String(res.data.token), {
          path: "/",
          expires: 1 / 288,
        });
        //Cookies.set("token", "okbud", { expires: 1 });
        //console.log(res.data.token);
        setDrawer(true);
        navigate("/profile/account");
      }
      //console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button variant="outlined" onClick={() => googlelogin()}>
              Sign in with Google
            </Button>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="http://localhost:3000/auth/register"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
