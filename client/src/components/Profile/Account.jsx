import React from "react";
import "./Profile.css";
import Details from "./Details";
import FriendList from "./FriendList";
import { useNavigate, } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {

  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoginContext } from "../../Context/LoginContext";

const Account = () => {
  //const firstNameRef = useRef(null);

  const { profileData } = useContext(LoginContext);
  const [snakb, toggleSB] = useState(false)
  const style = { bgcolor: "black" };
  let navigate = useNavigate();



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
            <Details snkbar={snakb} toggleSB={toggleSB} profileData={profileData} />
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
          <AccordionDetails sx={{ paddingLeft: '35%' }}>
            <FriendList profileData={profileData} />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            onClick={() => {
              navigate('/profile/cart/ac');
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
              navigate('/profile/library')
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
