import React from "react";
import { Link } from "react-router-dom";
const Gameitem = ({ name, imageSrc, rating, released, ratings_count }) => {
  const link = "/game/" + name.replace(/\s/g, "");
  return (
    <Link to={link}>
      <div className="my-3">
        <div className="card text-white bg-dark mb-3">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          ></div>
          <img
            src={
              !imageSrc
                ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
                : imageSrc
            }
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div className="card-body">
            <h4 className="card-title">{name} </h4>
            <h5 className="card-title">Released On: {released} </h5>
            <h5 className="card-title">Rating: {rating}</h5>
            <h5 className="card-title">Reviews: {ratings_count}</h5>
            {/* <p className="card-text">{description}</p> */}
            {/* <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Gameitem;
