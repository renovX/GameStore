import React from "react";
import Carousel from "./Carousel.jsx";
import Genres from "./Genres.jsx";
import Publishers from "./Publishers.jsx";
import { Container } from "@mui/material"

const Landing = () => {
  return (
    <Container sx={{ padding: '3%' }}>
      <Carousel />
      <Genres />
      <Publishers />

    </Container>
  );
};

export default Landing;
