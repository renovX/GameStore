import React from "react";
import Carousel from "./components/Carousel.jsx";
import Genres from "./components/Genres.jsx";
import Publishers from "./components/Publishers.jsx";

const Landing = () => {
  return (
    <div style={{ backgroundColor: "rgb(22, 22, 22)" }}>
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
