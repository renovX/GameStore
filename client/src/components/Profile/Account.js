import React from "react";
import Cookies from "js-cookie";
import "./Profile.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Routes, Route, useNavigate, Form } from "react-router-dom";
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

  const { profileData } = useContext(LoginContext);
  const [visible1, setVisiblity1] = useState(false);
  const [visible2, setVisiblity2] = useState(false);
  //const [passval, setPassVal] = useState("password");
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmPass] = useState("");
  const [passwordChanged, setPassChanged] = useState(false);
  const [snakb, toggleSB] = useState(false)
  const style = { bgcolor: "black" };
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (passwordChanged && password != confirmpass)
      return alert("Password is not same");

    const formData = new FormData(event.currentTarget)

    const updatedProfile = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: profileData.email,
      phone: formData.get('phone'),
      addr: [formData.get('line1'), formData.get('line2'), formData.get('city'), formData.get('state'), formData.get('country')],
    };
    if (password != "") updatedProfile.password = password

    const token = Cookies.get('token')
    //console.log(token)
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/update`;
    try {
      const resp = await axios.post(url, updatedProfile, { headers: { Authorization: `Bearer ${token}` } });
      console.log(resp.data)
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
            type={visible1 ? "" : "password"}
            variant="outlined"
            sx={{ width: "100%", ml: "0" }}
            defaultValue={password}
            onClick={() => { setPassChanged(true) }}
            onChange={(e) => {
              setPassword(e.target.value)

            }}
          />
          <IconButton
            onClick={() => {
              setVisiblity1(!visible1)
            }}
          >
            {visible1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            type={visible2 ? "" : "password"}
            variant="outlined"
            sx={{ width: "100%", ml: "0" }}
            defaultValue={confirmpass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              setVisiblity2(!visible2)
            }
            }
          >
            {visible2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            <Box component="form"
              onSubmit={handleSubmit}
              noValidate>
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
                          name='firstName'
                          defaultValue={profileData.firstName}
                          variant="outlined"
                          required
                          sx={{ width: "100%" }}
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
                          name="lastName"
                          defaultValue={profileData.lastName}
                          variant="outlined"
                          required
                          sx={{ width: "100%" }}
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
                          name="phone"
                          label="Number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={profileData.phone}
                          sx={{ width: "100%" }}

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
                          value={profileData.email}
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
                                  name='line1'
                                  label="Line 1"
                                  sx={{ width: "100%" }}
                                  defaultValue={profileData.addr[0]}

                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextField
                                  label="Line 2"
                                  name='line2'
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  defaultValue={profileData.addr[1]}

                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextField
                                  label="City"
                                  name='city'
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  defaultValue={profileData.addr[2]}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextField
                                  label="State"
                                  name='state'
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  defaultValue={profileData.addr[3]}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextField
                                  label="Country"
                                  name='country'
                                  variant="standard"
                                  defaultValue={profileData.addr[4]}
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
                          //onClick={handleSubmit}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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
