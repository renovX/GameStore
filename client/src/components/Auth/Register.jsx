import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Alert,
  Typography,
  Container,
  Backdrop,
  CircularProgress
} from "@mui/material";

import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
function userNameChk(uname) {
  var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
  const hasSpace = /\s/g.test(uname)
  const hasspch = format.test(uname)
  const firstCap = uname[0] == uname[0].toUpperCase()
  if (hasSpace || hasspch || firstCap)
    return true
  return false
}

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
        BlueStar
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
export default function Register() {
  const { setProfile } = useContext(LoginContext);
  const [isError, setError] = useState(false);
  const [passVal, setPasVal] = useState("");
  const [passVal2, setPasVal2] = useState("");
  const [errorMessage, setMessage] = useState(true);
  const [bdstate, setBDState] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const dform = {
      userName: data.get('userName'),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone-number"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };
    if (userNameChk(data.get('userName'))) {
      setError(true)
      setMessage("Invalid UserName(No space,No specialchar, first letter lowercase)")
      return
    }
    if (data.get("password") != data.get("confirm-password")) {
      setError(true);
      setMessage("Passwords do not match!");
      setPasVal("");
      setPasVal2("");

      return;
    }
    if (!(dform.email && dform.password && dform.phone && dform.firstName && dform.lastName && dform.userName)) {
      setError(true);
      setMessage("Fill all the details!");
      return;
    }
    setBDState(true)
    try {
      const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/register`;
      const resp = await axios.post(url, dform);
      setBDState(false)
      if (resp.data == "Account Exists") {
        setError(true);

        setMessage("User is already registered with same username or email");
        return;
      }

      setProfile({
        loggedIn: true,
        firstName: resp.data.firstName,
        lastName: resp.data.lastName,
        userName: resp.data.userName,
        phone: resp.data.phone,
        email: resp.data.email,
        friendList: resp.data.friendList,
        password: resp.data.password,
        addr: resp.data.addr,
      });
      navigate("/redirect");
    }
    catch (e) {
      console.log(e)
      setBDState(false)
    }
  };
  const handleChange = (event) => {
    setPasVal(event.target.value);
  };
  const handleChange2 = (event) => {
    setPasVal2(event.target.value);
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
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isError ? <Alert severity="error">{errorMessage}</Alert> : <></>}

          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone-number"
                  label="Phone Number"
                  type="number"
                  name="phone-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={passVal}
                  autoComplete="new-password"
                  onChange={handleChange}
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  value={passVal2}
                  id="confirm-password"
                  autoComplete="new-password"
                  onChange={handleChange2}
                  color="main"
                  sx={{ input: { color: 'white', backgroundColor: 'black' }, label: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ color: '#5e0202' }}
                  control={
                    <Checkbox value="allowExtraEmails" color="main" sx={{ color: '#5e0202' }} />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="main"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/auth/signin" variant="body2" color='#5e0202'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, color: '#5e0202' }} />
      </Container>
    </ThemeProvider>
  );
}
