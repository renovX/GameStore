import "./App.css";
import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar.js";
import "./components/Navbar.css";
import GamesByGenre from "./components/GamesByGenre";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Landing from "./Landing";
import Game from "./components/Game";
import Cart from "./components/Profile/Cart";
import Account from "./components/Profile/Account";
import { useState } from "react";
import Library from "./components/Profile/Library";
import SignIn from "./components/Auth/SignIn";
import { LoginContext } from "./Context/LoginContext";
import { DrawerContext } from "./Context/DrawerContext";
import Register from "./components/Auth/Register";
import Redirect from "./page/Redirect";
import Cookies from "js-cookie";
import { Switch } from "@mui/material";
import axios from "axios";

function App() {
  //const cookies = new Cookies();
  const [cartItems, setCartItem] = useState([]);

  const [profileData, setProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    password: "",
    addr: ["", "", "", "", ""],
    cart: [],
    library: [],
  });
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/get-data`,
        {
          withCredentials: true,
        }
      );
      if (res) {
        setProfile({
          userName: res.data.userName,
          firstName: res.data.firstName,
          firstName: res.data.lastName,
          phone: res.data.phoneNumber,
          email: res.data.email,
          password: "",
          addr: res.data.address,
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
              <Route path="profile/account" element={<Account />} />
              <Route path="profile/library" element={<Library />} />
              <Route path="auth/signin" element={<SignIn />} />
              <Route path="auth/register" element={<Register />} />
            </Route>
          </Routes>
        </LoginContext.Provider>
      </DrawerContext.Provider>
    </div>
  );
}

export default App;
