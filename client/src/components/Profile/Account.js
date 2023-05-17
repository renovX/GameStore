import React from "react";
import "./Profile.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Paper, Snackbar, Alert } from "@mui/material";
import { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { display } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";

const Account = () => {
  //const firstNameRef = useRef(null);

  const { profileData, setProfile } = useContext(LoginContext);
  const [firstName, setFName] = useState(profileData.firstName);
  const [lastName, setLName] = useState(profileData.lastName);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(+profileData.phone);
  const [password, setPassword] = useState('');
  //address states
  const [line1, setLine1] = useState(profileData.addr[0]);
  const [line2, setLine2] = useState(profileData.addr[1]);
  const [city, setCity] = useState(profileData.addr[2]);
  const [state, setState] = useState(profileData.addr[3]);
  const [country, setCountry] = useState(profileData.addr[4]);

  const [visible, setVisiblity] = useState(false);
  const [passval, setPassVal] = useState("password");
  const [confirmpass, setConfirmPass] = useState("");
  const [passwordChanged, setPassChanged] = useState(false);
  const [snakb, toggleSB] = useState(false)
  const style = { bgcolor: "black" };
  let navigate = useNavigate();
  const handleSubmit = async () => {
    if (passwordChanged && password != confirmpass)
      return alert("Password is not same");
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      addr: [line1, line2, city, state, country],
    };
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/update`;
    try {
      await axios.post(url, updatedProfile);
      toggleSB(true)
    } catch (e) {
      console.log(e);
    }
  };
  const routeChange = () => {
    let path = `/profile/cart/ac`;
    navigate(path);
  };
  const PasswordField = ({ type }) => {
    if (type == "pass")
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="password"
            type={passval}
            variant="outlined"
            sx={{ width: "100%", ml: "0" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassChanged(true);
            }}
          />
          <IconButton
            onClick={() => {
              if (passval == "password") {
                setPassVal("");
                setVisiblity(!visible);
              } else {
                setPassVal("password");
                setVisiblity(!visible);
              }
            }}
          >
            {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
      );
    else
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="password"
            type={passval}
            variant="outlined"
            sx={{ width: "100%", ml: "0" }}
            value={confirmpass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              if (passval == "password") {
                setPassVal("");
                setVisiblity(!visible);
              } else {
                setPassVal("password");
                setVisiblity(!visible);
              }
            }}
          >
            {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
      );
  };
  return (
    <Container fixed sx={{ bgcolor: "grey" }}>
      <div>
        <h1>Account</h1>
      </div>
      <div>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} sx={{ m: "auto", width: "60%" }}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "20%", height: "50px" }}
                    >
                      <Typography color="blue"> First Name</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="firstName"
                        value={firstName}
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        onChange={(e) => {
                          setFName(e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "20%", height: "50px" }}
                    >
                      <Typography color="blue"> Last Name</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="lastName"
                        value={lastName}
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        onChange={(e) => {
                          setLName(e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: "25%" }}>
                      <Typography color="blue">Phone Number</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id="phone"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={phone}
                        sx={{ width: "100%" }}
                        onChange={(e) => {
                          setPhone(+e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: "20%" }}>
                      <Typography color="blue">Email</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="outlined"
                        id="email"
                        value={email}
                        sx={{ width: "100%" }}
                      //onChange={(e) => {setEmail(e.target.value);}}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "auto" }}
                    >
                      <Typography color="blue">Password</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <PasswordField type="pass" />
                    </TableCell>
                  </TableRow>
                  {passwordChanged ? (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "auto" }}
                      >
                        <Typography color="blue">Confirm Password</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <PasswordField />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: "20%" }}>
                      <Typography color="blue">Address</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td>
                              <TextField
                                id="address"
                                variant="standard"
                                label="Line 1"
                                sx={{ width: "100%" }}
                                value={line1}
                                onChange={(e) => {
                                  setLine1(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextField
                                label="Line 2"
                                variant="standard"
                                sx={{ width: "100%" }}
                                value={line2}
                                onChange={(e) => {
                                  setLine2(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextField
                                label="City"
                                variant="standard"
                                sx={{ width: "100%" }}
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextField
                                label="State"
                                variant="standard"
                                sx={{ width: "100%" }}
                                value={state}
                                onChange={(e) => {
                                  setState(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextField
                                label="Country"
                                variant="standard"
                                value={country}
                                onChange={(e) => {
                                  setCountry(e.target.value);
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: "20%", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Friends</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Friend List</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            onClick={() => {
              routeChange();
            }}
          >
            <Typography>Cart</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            onClick={() => {
              routeChange();
            }}
          >
            <Typography>Library</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Setting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Friend List</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Snackbar
        open={snakb}
        autoHideDuration={6000}
        onClose={() => { toggleSB(false) }}
        message="Note archived"

      ><Alert onClose={() => { toggleSB(false) }} severity="success" sx={{ width: '100%' }}>
          Profile Updated
        </Alert></Snackbar>
    </Container>
  );
};
export default Account;
