import React from "react";
import "./GamePage.css"
import GameCarousal from "./GameCarousal";
import GameDetails from "./GameDetails";
import CustomerReview from "./CustomerReview";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { LoginContext } from "../../Context/LoginContext";
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
function shortHand(str) {
  if (!str) return ""
  const ans = str.split(" ").map(s => s[0]).join('')
  return ans
}
const Game = ({ cartitem, cartfn }) => {
  const { profileData, setProfile } = useContext(LoginContext);
  const { gameId } = useParams();
  const [gameData, setGameData] = useState({ images: [] });
  const [commData, setCommData] = useState([])
  const [purchased, setPurchase] = useState(false)
  const [commStatus, setCommStatus] = useState(true)
  const [userComm, setUserComm] = useState('')
  const [snakb, toggleSB] = useState(false)
  const addToCart = (item) => {
    const p = profileData;
    const cart = profileData.cart
    if (!cart.find(it => it.id == item.id))
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
    toggleSB(true)


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

      <h2 className="gameHeading">{gameData.name}</h2>
      <GameCarousal gameData={gameData} />

      <div className="pricing">

        <h2 className="buy-heading">Buy {shortHand(gameData.name)}</h2>

        <div className="p2">
          <div className="priceval">₹{gameData.price}</div>

          {profileData.loggedIn ? (

            <button
              type="button"
              className="buy-button"
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
      <GameDetails gameData={gameData} />
      <CustomerReview
        commData={commData}
        profileData={profileData}
        handleForm={handleForm}
        userComm={userComm}
        commStatus={commStatus}
        setCommStatus={setCommStatus}
        CommentRate={CommentRate}
      />

      <Snackbar
        open={snakb}
        autoHideDuration={6000}
        onClose={() => { toggleSB(false) }}
        message="Note archived"

      ><Alert onClose={() => { toggleSB(false) }} severity="success" sx={{ width: '100%' }}>
          Added Comment
        </Alert></Snackbar>
    </div>
  );
};
export default Game;
