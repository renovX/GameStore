import React from "react";
import parse from 'html-react-parser';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import axios from "axios";
//import "../../images/img1.jpeg";
const capitalize = (str) => (str.charAt(0).toUpperCase() + str.slice(1))
const CommentRate = ({ rate }) => {
  return rate ?
    (<div style={{ display: 'flex', flexDirection: 'row' }}><h2>Recommended</h2><SentimentVerySatisfiedIcon sx={{ color: 'green' }} fontSize="large" /></div>) : (<div style={{ display: 'flex', flexDirection: 'row' }}><h2>Not Recommended</h2><SentimentVeryDissatisfiedIcon sx={{ color: 'red' }} fontSize="large" /></div>
    )
}
function parseReq(str) {
  //removing unnecessary
  //str = str.minimum
  str = str.replace("Minimum:", "");
  const index = str.indexOf('Additional Notes');
  if (index > -1) str = str.substr(0, index)
  //console.log(str)
  //converting to array
  const os = str.substr(str.indexOf('OS:'), str.indexOf('Processor:') - str.indexOf('OS:'))
  const processor = str.substr(str.indexOf('Processor:'), str.indexOf('Memory:') - str.indexOf('Processor:'))
  const mem = str.substr(str.indexOf('Memory:'), str.indexOf('Graphics:') - str.indexOf('Memory:'))
  const gra = str.substr(str.indexOf('Graphics:'), str.indexOf('Storage:') - str.indexOf('Graphics:'))
  const storage = str.substr(str.indexOf('Storage:'), str.indexOf('Sound ') - str.indexOf('Storage:'))
  const sound = str.substr(str.indexOf('Sound'))
  return [os, processor, mem, gra, storage, sound]

}

const Game = ({ cartitem, cartfn }) => {
  const { profileData, setProfile } = useContext(LoginContext);
  const { gameId } = useParams();
  const [gameData, setGameData] = useState({ images: [] });
  const [commData, setCommData] = useState([])
  const [purchased, setPurchase] = useState(false)
  const [commStatus, setCommStatus] = useState(true)
  const [userComm, setUserComm] = useState('')
  const addToCart = (item) => {
    const p = profileData;
    const cart = profileData.cart;

    cart.push(item);
    p.cart = cart;
    setProfile(p);
  };
  let navigate = useNavigate();

  const handleForm = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const rate = commStatus
    await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/comment/add-comment/${gameId}`, { gameName: gameData.name, profileId: profileData.id, commdata: formData.get("comment-text"), rate: rate })



  }
  useEffect(() => {
    //console.log("Okb");
    async function fetchGameData() {
      const res = await axios.get(
        `https://api.rawg.io/api/games/${gameId}`, { params: { key: '10db3b3eb09e4ce2974ff2f974f11893' } }
      );
      const res2 = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots`, { params: { key: '10db3b3eb09e4ce2974ff2f974f11893' } })
      const respdata = res.data
      const pcpfm = respdata.platforms.find(el => el.platform.name == 'PC')
      const gameImages = res2.data.results.map(img => img.image)

      setGameData({
        name: respdata.name,
        images: gameImages ? gameImages : [''],
        bgim: respdata.background_image,
        description: respdata.description,
        requirements: (pcpfm.requirements && pcpfm.requirements.minimum) ? parseReq(pcpfm.requirements.minimum) : ['', '', ''],
        developer: respdata.developers[0].name,
        publisher: respdata.publishers[0].name,
        genre: respdata.genres.map(genre => genre.name).toString(),
        release_date: pcpfm.released_at,
        rating: capitalize(respdata.ratings[0].title),
        price: 1000.00
      });

    }
    async function fetchCommentData() {
      let commentData = (await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/comment/get-comments/${gameId}`)).data
      const user_comment = commentData.find(c => (String(c.uname) === String(profileData.userName)))
      console.log('c:' + user_comment)
      if (user_comment) {

        setUserComm(user_comment.data)
        setCommStatus(user_comment.rate)
        commentData = commentData.filter(c => c != user_comment)
      }
      setCommData(commentData)

    }
    //console.log(gameData);
    fetchGameData();
    fetchCommentData()
    if (profileData.library && profileData.library.find(game => game.id == gameId))
      setPurchase(true)

  }, []);


  return (
    <div className="gamePage">
      <div className="gameHeading">
        <h2 className="text-center">{gameData.name}</h2>
      </div>
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

        <div className="infotable">
          <table className="table table-success table-striped-columns">
            <thead>
              <tr>
                <th colSpan={2}>{gameData.name}</th>
              </tr>
            </thead>
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
      </div>

      <div className="pricing">
        <div className="card">
          <div className="card-body">
            <h2>Buy XYZW</h2>

            <div className="p2">
              <div className="priceval">
                <strong>Price:{gameData.price}</strong>
              </div>
              {profileData.loggedIn ? (

                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    const route = purchased ? '/profile/library' : '/profile/cart/ac'
                    if (!purchased)
                      addToCart({
                        img: gameData.bgim,
                        name: gameData.name,
                        id: gameId,
                        price: +gameData.price,

                      });
                    navigate(route)
                  }}
                >
                  {purchased ? (<span>View In Library</span>) : <span>Add To Cart</span>}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="gameDetails">
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button  d-block text-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Description
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body" style={{ backgroundColor: "black" }}>
                {parse(String(gameData.description))}
              </div>
            </div>
          </div>
          <div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  className="accordion-button collapsed  d-block text-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  System Requirements
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div className="accordion-body">
                  <ol>
                    {gameData.requirements ? (
                      gameData.requirements.map((s) => <li>{s}</li>)
                    ) : (
                      <li></li>
                    )}
                  </ol>
                </div>
              </div>
            </div>
            <div className="accordion-item ">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  className="accordion-button collapsed d-block text-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Criric Review
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="review">
        <div>
          <h2>Customer Review</h2>
        </div>
        {profileData.loggedIn ? (<Box
          component="form"
          noValidate
          onSubmit={handleForm}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Add Your Review
            </label>
            <textarea
              className="form-control"
              id="comment-text"
              name="comment-text"
              defaultValue={userComm}
              rows="3"
            ></textarea>
            <ToggleButtonGroup
              value={commStatus}
              exclusive
              onChange={() => { setCommStatus(!commStatus) }}
              aria-label="text alignment"
            >
              <ToggleButton value={true} aria-label="left aligned">
                <ThumbUpIcon sx={{ color: 'green' }} />
              </ToggleButton>
              <ToggleButton value={false} aria-label="centered">
                <ThumbDownIcon sx={{ color: 'red' }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginBottom: '3%' }}>
            Submit
          </button>
        </Box>) : <></>}
        {commData ? commData.map(comment => (
          <div className="comments">

            <div className="custdetail">
              <h3 style={{ color: 'blue' }}>{comment.uname}</h3>
              <div className="cust-rating">
                <CommentRate rate={comment.rate} />
                <text>Total Hours: {comment.hours}h</text>
              </div>
            </div>
            <p style={{ color: 'black' }}>{comment.data}
            </p></div>)) : (<p style={{ color: 'black' }}>No Comments Posted</p>)}
      </div>
    </div>
  );
};
export default Game;
