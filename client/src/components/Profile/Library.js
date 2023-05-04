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
  "https://i0.wp.com/insider-gaming.com/wp-content/uploads/2022/12/cyberpunk-2077-game-of-the-year-edition-scaled-e1670012903149.jpg?resize=1024%2C576&ssl=1";

const Imag = () => {
  return <img src={imgaddr}></img>;
};
const GameCard = ({ name }) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 300 }} image={imgaddr} title="green iguana" />
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
  //console.log(gameArray[0].name);
  /*useEffect(async ()=>
    {
        const res = await (
          await fetch(`http://localhost:8000/profile/library/${userId}`)
        ).json();
        setgameArray(res)
    })*/
  //let X = [...Array(5).keys()];
  //const arr = [...Array(5).keys()];
  return (
    <Container fixed>
      <h1 style={{ color: "black" }}>All Games</h1>
      <Grid container>
        {gameArray.map((a) => (
          <Grid xs={4} sx={{ p: 3 }}>
            <GameCard name={a.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Library;
