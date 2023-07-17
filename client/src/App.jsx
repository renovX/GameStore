import "./App.css";
import Page404 from "./page/Page404";
import PrivateRoutes from "./utils/PrivateRoutes";
import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import "./components/Navbar.css";
import GamesByGenre from "./components/GamesByGenre";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/HomePage/Landing";
import Game from "./components/GamePage/Game";
import Cart from "./components/Profile/Cart";
import Account from "./components/Profile/Account";
import UserProfile from './components/Friend/UserProfile'
import { useState } from "react";
import Library from "./components/Profile/Library";
import SignIn from "./components/Auth/SignIn";
import { LoginContext } from "./Context/LoginContext";
import { DrawerContext } from "./Context/DrawerContext";
import Register from "./components/Auth/Register";
import Redirect from "./page/Redirect";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
  //const cookies = new Cookies();
  const [cartItems, setCartItem] = useState([]);

  const [profileData, setProfile] = useState({
    id: '',
    token: '',
    loggedIn: false,
    userName: "",
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    password: "",
    addr: ["", "", "", "", ""],
    friendList: [],
    cart: [],
    library: [],
  });
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const token = Cookies.get('token')
      if (token) {
        setProfile({ loggedIn: true })
        profileData.token = token
      }

      const res = await axios.get(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/get-data`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res) {
        setProfile({
          loggedIn: true,
          token: token,
          id: res.data._id,
          userName: res.data.userName,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phoneNumber,
          email: res.data.email,
          password: "",
          addr: res.data.address,
          friendList: res.data.friendList,
          cart: res.data.cart,
          library: res.data.libraryGames,
        });
        setDrawer(true);
      } else {
        console.log("Not Loaded");
      }
    }
    try {
      fetchData();
      console.log(profileData);
    } catch (e) {
      console.log(e);
      console.log("Not Loaded");
    }
  }, []);

  return (
    <div className="App">
      <DrawerContext.Provider value={{ drawer, setDrawer }}>
        <LoginContext.Provider value={{ profileData, setProfile }}>
          <Routes>
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Landing />} />
              <Route path="genres/:genre" element={<GamesByGenre />} />
              <Route
                path="game/:gameId"
                element={<Game cartitem={cartItems} cartfn={setCartItem} />}
              />
              <Route
                path="profile/cart/:payStatus"
                element={<Cart cartitem={cartItems} cartfn={setCartItem} />}
              />
              <Route path='profile' element={<PrivateRoutes isLogged={profileData.loggedIn} />}>
                <Route path="account" element={<Account />} />
                <Route path="library" element={<Library />} />
              </Route>
              <Route path='profiles/:username' element={<UserProfile />}></Route>
              <Route path="auth/signin" element={<SignIn />} />
              <Route path="auth/register" element={<Register />} />
              <Route path="*" element={<Page404 />} />
            </Route>

          </Routes>
          <Footer />
        </LoginContext.Provider>
      </DrawerContext.Provider>
    </div>
  );
}

export default App;
