import Profile from "../model/Profile.js";
import Game from "../model/Game.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
function cookieParser(cookieString) {
  if (cookieString === "") return {};
  let pairs = cookieString.split(";");
  let splittedPairs = pairs.map((cookie) => cookie.split("="));
  const cookieObj = splittedPairs.reduce(function (obj, cookie) {
    obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
      cookie[1].trim()
    );

    return obj;
  }, {});

  return cookieObj;
}
const profileController = {
  getData: async (req, res) => {
    //console.log(req.cookies);
    try {
      //if (req.cookies.token) {
      res.setHeader("Access-Control-Allow", true);
      console.log(req.headers[0])
      const tokenData = JSON.parse(atob(req.cookies.token.split(".")[1]));
      const profile = await Profile.findOne({ email: tokenData.email });
      res.send(profile);
      //res.send("Hi");
      console.log("Data sent succesfully");
      //} else {
      // console.log("Failed to fetch profile data: UnAuthorized");
      //res.sendStatus(401);
      //}

    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const profile = await Profile.findOne({ email: email });
      if (!profile) return res.send("Invalid Email");
      //verifying password
      if (bcrypt.compare(password, profile.password)) res.send("found");
      else res.send("Not found");
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  },
  addToLibrary: async (req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Credentials", true);
      //const { email, cartItems } = req.body;
      //console.log("Token is:" + req.cookies.token);
      const email = JSON.parse(atob(req.cookies.token.split(".")[1])).email;
      console.log("email is:" + email);
      const profile = await Profile.findOne({ email: email });

      const cartItems = profile.cart;

      console.log(cartItems);
      // const gameList = await Promise.all(
      //   cartItems.map(async (item) => {
      //     var id = mongoose.Types.ObjectId(item.id);
      //     return await Game.findById(id);
      //   })
      // );
      // console.log(cartItems);
      // console.log(gameList);

      const library = profile.libraryGames.concat(cartItems);
      await Profile.findOneAndUpdate(
        { email: email },
        { libraryGames: library, cart: [] }
      );
      res.send("Update Success");
      console.log("Added to Library");
    } catch (e) {
      res.send(e.message);
      console.log(e);
    }
  },
  update: async (req, res) => {
    try {
      const { firstName, lastName, phone, addr } = req.body;
      //console.log(password);
      let newData = { firstName: firstName, lastName: lastName, phoneNumber: phone, address: addr }
      if (req.body.password) {

        const encrypted_pass = await bcrypt.hash(password, 10);
        newData.password = encrypted_pass
      }
      const email = req.body.email
      const profile = await Profile.findOneAndUpdate(
        { email: email },
        newData
      );
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      //res.setHeader('Access-Control-Allow-Credentials', 'true')
      console.log(req.body)
      console.log('Profile Update Success')
      res.send(profile);

    } catch (e) {
      res.send(e.message);
      console.log(e)
    }
  },
};
export default profileController;
