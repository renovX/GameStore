import React from "react";
import "./Profile.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";

import {
  styled,
  Grid,
  Paper,
  CardActions,
  Card,
  CardMedia,
  Container,
  CardContent,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  ListItemText,
  Typography,
} from "@mui/material";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { display } from "@mui/system";
const userId = "";
const imgaddr =
  "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg";

const Imag = () => {
  return <img src={imgaddr}></img>;
};
const GameCard = ({ name, img }) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 300 }} image={img} title="green iguana" />
      <CardContent sx={{ height: 30, p: 0 }}>
        <Typography component="div" variant="h6">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ height: 30, bgcolor: "wheat" }}>
        <Button size="small">Play</Button>
        <Button size="small">Uninstall</Button>
      </CardActions>
    </Card>
  );
};
const Library = () => {
  const { profileData } = useContext(LoginContext);
  const [gameArray, setgameArray] = useState(profileData.library);
  return (
    <Container fixed>
      <h1 style={{ color: "black" }}>All Games</h1>
      <Grid container>
        {gameArray.map((a) => (
          <Grid xs={4} sx={{ p: 3 }}>
            <GameCard name={a.name} img={a.img} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Library;
