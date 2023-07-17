import React from "react";
import "./genres.css";

function Genres() {
  return (
    <>
      <section>

        <div className="topic" >
          <p>PUBLISHERS</p>
        </div>
      </section>

      <section className="griddera">
        <figure class="hover-img">
          <img
            src={require("../images/ea.jpg")}
            alt="ea-logo"
            height="83%"
            width="100%"
          />
          <a href="/action" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Electronic Arts</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/ubisoft11.jfif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/adventure" target="_blank" rel="noreferrer">
            <figcaption>
              <h4>Ubisoft</h4>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/microsoft1.png")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/strategy" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Microsoft Studios</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/sony.jpg")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/indie" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>SONY</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/warner.jfif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/shooter" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Warner Bros.</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/bandai.png")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/sports" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Bandai Namco</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/rock.jfif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/fighting" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Rockstar Games</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/cdp.png")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/multiplayer" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>CD PROJEKT RED</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/activision.webp")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/racing" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Activision</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/konami1.png")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/rpg" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Konami</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/sega.png")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/arcade" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>SEGA</h3>
            </figcaption>
          </a>
        </figure>
        <figure class="hover-img">
          <img
            src={require("../images/valve.jfif")}
            alt=""
            height="83%"
            width="100%"
          />
          <a href="/casual" target="_blank" rel="noreferrer">
            <figcaption>
              <h3>Valve</h3>
            </figcaption>
          </a>
        </figure>
      </section>
    </>
  );
}

export default Genres;
