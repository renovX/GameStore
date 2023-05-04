import React from "react";
import Carousel from "./components/Carousel.js";
import Genres from "./components/Genres.js";
import Publishers from "./components/Publishers.js";

const Landing = () => {
  return (
    <div>
      <div className="page-wrapper">
        <Carousel />
        <Genres />
        <Publishers />
        <section className="headline">
          <h1>Responsive Navigation</h1>
          <p>Using CSS grid and flexbox to easily build navbars!</p>
        </section>
      </div>
    </div>
  );
};

export default Landing;
