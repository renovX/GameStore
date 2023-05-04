import React from "react";
import "./Profile.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Routes, Route, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Card,
  Container,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  ListItemText,
} from "@mui/material";
//import Container from "@mui/material/Container";
//import List from "@mui/material/List";
//import Divider from "@mui/material/Divider";
//import ListItem from "@mui/material/ListItem";
//import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { display } from "@mui/system";
import { LoginContext } from "../../Context/LoginContext";
import { DrawerContext } from "../../Context/DrawerContext";
const Cart = () => {
  async function fetchData() {
    await axios.get(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/add-to-library`,
      {
        withCredentials: true,
      }
    );

    const res = await axios.get(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/get-data`,
      {
        withCredentials: true,
      }
    );
    if (res) {
      setProfile({
        name: res.data.name,
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

  const { profileData, setProfile } = useContext(LoginContext);
  const { drawer, setDrawer } = useContext(DrawerContext);
  const { payStatus } = useParams();
  const [cartItems, setCart] = useState(
    /*[
    { img: "img", name: "CyberPunk", price: 100000, id: "123" },
    { img: "img", name: "CyberPunk2", price: 100000, id: "456" },
  ]*/ profileData.cart
  );
  const [totalPrice, setPrice] = useState(0);
  const style = {
    width: "60%",
    //maxWidth: 360,
    bgcolor: "background.paper",
    ml: "20%",
  };
  const navigate = useNavigate();
  useEffect(() => {
    var sum = 0;
    for (let i = 0; i < cartItems.length; i++) sum += cartItems[i].price;
    if (payStatus == "success") {
      fetchData();
      const p = profileData;
      p.library = Object.assign(profileData.library, ...profileData.cart);

      setProfile(p);
      setCart([]);
    }
    setPrice(sum);
  }, []);
  const removeItem = (name) => {
    const cart = profileData.cart.filter(function(obj) {
      return obj.name !== name;
    });

    const p = profileData;
    setCart(cart);
    p.cart = cart;
    console.log("Curr Cart:" + p.cart);
    setProfile(p);
  };
  //var sum = 0;
  const handelPayment = async () => {
    const resp = await axios.post(
      "http://localhost:8000/stripe/create-checkout-session",
      {
        cartItems: profileData.cart,
      }
    );
    if (resp.data.url) {
      const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/logout`;

      await axios.post(url, {
        cart: profileData.cart,
        email: profileData.email,
      });
      window.location.href = resp.data.url;
    } else alert("no url");
  };
  //setPrice(gameArray[0].price + gameArray[1].price);
  return (
    <Container fixed sx={{ bgcolor: "primary.main" }}>
      {String(payStatus) == "fail" ? (
        <Card variant="outlined" sx={{ bgcolor: "red" }}>
          <span>PAYMENT FAILED</span>
        </Card>
      ) : (
        <></>
      )}
      <h1>CART</h1>
      {cartItems.length == 0 ? (
        <Container sx={{ bgcolor: "primary.main", mr: "20%", height: "300px" }}>
          <h2>Your Cart is Empty</h2>
          <Button
            variant="outlined"
            color="success"
            sx={{ ml: "45%", mt: 3 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Button>
        </Container>
      ) : (
        <>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {cartItems ? (
              cartItems.map((g) => (
                <>
                  <ListItem
                    sx={{ displayPrint: "flex", flexDirection: "row" }}
                    divider
                  >
                    <span>{g.img}</span>
                    <span className="gameName">{g.name}</span>
                    <span className="gprice">{g.price}</span>
                    <IconButton
                      aria-label="delete"
                      sx={{ position: "absolute", right: "2%", width: 5 }}
                      onClick={() => {
                        removeItem(g.name);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </>
              ))
            ) : (
              <></>
            )}
            <ListItem sx={{ displayPrint: "flex", flexDirection: "row" }}>
              <span>Total</span>
              <span className="totalPrice">{totalPrice}</span>
            </ListItem>
          </List>
          <Button
            variant="outlined"
            color="success"
            sx={{ ml: "45%", mt: 3 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Button>
          <Button
            variant="contained"
            sx={{ ml: "43%", mt: 3, mb: 2 }}
            color="success"
            onClick={handelPayment}
          >
            Purchase
          </Button>
        </>
      )}
    </Container>
  );
};
export default Cart;
