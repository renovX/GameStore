import React from "react";
import { Link } from "react-router-dom";
import genreData from "../assets/genreData.js";
//import "./genres.css";

function Genres() {
  console.log(genreData);

  return (
    <>
      <section>
        <div className="topic" height="250px"></div>
        <div className="topic" height="150px">
          <p>GENRES</p>
        </div>
        <div></div>
      </section>

      <section className="griddera">
        {genreData.map((genre) => (
          <figure className="hover-img">
            <img src={genre.imgSrc} alt="" height="83%" width="100%" />
            <Link to={`/genres/${genre.name}`} rel="noreferrer">
              <figcaption>
                <h3>{genre.name}</h3>
              </figcaption>
            </Link>
          </figure>
        ))}
        <extra>
          {/* <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/action" rel="noreferrer">
            <figcaption>
              <h3>Action</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/174/1743b3dd185bda4a7be349347d4064df.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/adventure" rel="noreferrer">
            <figcaption>
              <h3>Adventure</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/0bd/0bd5646a3d8ee0ac3314bced91ea306d.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/strategy" rel="noreferrer">
            <figcaption>
              <h3>Strategy</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/indie" rel="noreferrer">
            <figcaption>
              <h3>Indie</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/shooter" rel="noreferrer">
            <figcaption>
              <h3>Shooter</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/cb4/cb487ab3c54b81cb685388bab42ec848.jpeg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/sports" rel="noreferrer">
            <figcaption>
              <h3>Sports</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/a32/a32c9c299488ca99afc3fcea605a7718.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/fighting" rel="noreferrer">
            <figcaption>
              <h3>Fighting</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/2fd/2fd1b58116b10cc1f4442bee5593ca7c.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/multiplayer" rel="noreferrer">
            <figcaption>
              <h3>Multiplayer</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/screenshots/224/224ea7d08ed1a83f62fda4d16e038f74.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/racing" rel="noreferrer">
            <figcaption>
              <h3>Racing</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/b22/b227810b1a1bcbe9cf3dda22534c686e.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/platformer" rel="noreferrer">
            <figcaption>
              <h3>Platformer</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/b69/b69a67833630dd96d8eee9d2c8c27574.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/arcade" rel="noreferrer">
            <figcaption>
              <h3>Arcade</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/casual" rel="noreferrer">
            <figcaption>
              <h3>Casual</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/simulation" rel="noreferrer">
            <figcaption>
              <h3>Simulation</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src={require("./images/puzzle.avif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/board" rel="noreferrer">
            <figcaption>
              <h3>Board</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src={require("./images/cards.avif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/card" rel="noreferrer">
            <figcaption>
              <h3>Card</h3>
            </figcaption>
          </a>
        </figure>
        <figure className="hover-img">
          <img
            src="https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg"
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/genres/puzzle" rel="noreferrer">
            <figcaption>
              <h3>Puzzle</h3>
            </figcaption>
          </a>
        </figure> */}
        </extra>
      </section>
    </>
  );
}

export default Genres;
