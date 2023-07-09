import * as React from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  CssBaseline,
  TextField,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  Alert,
  AlertTitle,
  FormControlLabel,
  CircularProgress,
  Backdrop
}
  from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    main: createColor('#5e0202'),
    nwh: createColor('#ffffff')
  },
},
);
export default function SignIn() {
  const setUserProfile = (data) => {
    setProfile({
      id: data._id,
      loggedIn: true,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      phone: data.phoneNumber,
      email: data.email,
      password: "",
      friendList: data.friendList,
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
  const [alertStatus, setAlert] = useState(false)
  const [bdstate, setBDState] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBDState(true)
    const data = new FormData(event.currentTarget);
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/login`;
    //alert(url);

    try {
      const res = await axios.post(url, {
        emus: data.get("email"),
        password: data.get("password"),

      });
      setBDState(false)
      if (res) {
        //console.log(res);
        setUserProfile(res.data);
        Cookies.remove("token");
        Cookies.set("token", String(res.data.token), {
          path: "/",
          expires: 1 / 288,
        });
        setDrawer(true);
        navigate("/profile/account");
      }
      //console.log(res.data);
    } catch (e) {
      console.log(e);
      setBDState(false)
      setAlert(true)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={bdstate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        {alertStatus ? (<Alert sx={{ marginTop: "2%" }} severity="error">
          <AlertTitle>LOGIN FAIL</AlertTitle>
          Invalid username/email or password
        </Alert>) : <></>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
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
            color='nwh'
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address/UserName"
              color="main"
              sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
              name="email"
              autoComplete="email/username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              color="main"
              name="password"
              label="Password"
              sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{ color: '#5e0202' }}
              control={<Checkbox value="remember" color="main" sx={{ color: '#5e0202' }} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              color="main"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button color='main' variant="outlined" onClick={() => googlelogin()}>
              Sign in with Google
            </Button>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Link href="#" variant="body2" color='#ffffff'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="http://localhost:3000/auth/register"
                  variant="body2"
                  color='#ffffff'
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color: '#ffffff' }} />
      </Container>
    </ThemeProvider>
  );
}
