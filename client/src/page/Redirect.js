import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { DrawerContext } from "../Context/DrawerContext";

export default function Redirect() {
  const { setDrawer } = useContext(DrawerContext);
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
      setTimeout(() => {
        setDrawer(true);
        navigate("/");
      }, 3000);
    }, 3000);
  });
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <h3>Creating your account </h3>
        <CircularProgress />
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Account Created Successfully
        </Alert>
      </Snackbar>
    </>
  );
}
