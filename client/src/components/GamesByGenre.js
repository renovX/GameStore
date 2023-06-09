import React from "react";
import Gameitem from "./Gameitem.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GamesByGenre = () => {
  const { genre } = useParams();

  const [data, setData] = useState(() => []);
  const [isLoaded, setIsLoaded] = useState(() => false);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(
        "https://api.rawg.io/api/games?" +
        new URLSearchParams({
          key: "10db3b3eb09e4ce2974ff2f974f11893",
          page_size: 39,
          genres: genre,
        })
      );
      const fetchedData = await res.json();
      setData(fetchedData.results);
    };

    if (!isLoaded) {
      dataFetch();
      setIsLoaded(true);
    }
  }, [isLoaded, genre]);

  console.log(data);

  return (
    <div>
      <div className="container">
        <div className="row">
          {data.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Gameitem
                  gameId={element.id}
                  name={element.name ? element.name : ""}
                  imageSrc={element.background_image}
                  released={element.released}
                  rating={element.rating}
                  ratings_count={element.ratings_count}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamesByGenre;
