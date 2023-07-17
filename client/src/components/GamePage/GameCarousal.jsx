import React from "react"
export default function GameCarousal(props) {
  const gameData = props.gameData
  return (
    <div className="tab1">
      <div className="game_images">
        <div
          id="carouselExample"
          className="carousel carousel-dark carousel-fade "
          data-bs-ride="carousel"
        // style={{ height: "50rem" }}
        >
          <div className="carousel-inner">
            {gameData.images ? gameData.images.map(img => (<div className="carousel-item active" style={{ width: "100%" }}>
              <img
                src={img}
                className="fixedimage"
                style={{ height: "100%", width: "100%" }}
                alt="..."
              />
            </div>)) : (<></>)

            }
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <table className="table table-striped-columns itable">
        <tbody>
          <tr>
            <td>Developer</td>
            <td>{gameData.developer}</td>
          </tr>
          <tr>
            <td>Release Date</td>
            <td>{gameData.release_date}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{gameData.publisher}</td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>{gameData.genre}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>{gameData.rating}</td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}