import Profile from "../model/Profile.js";
import Game from "../model/Game.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
function fetchEmail(req) {
  const token = req.headers.authorization.split(' ')[1]
  return JSON.parse(atob(token.split(".")[1])).email;
}
const profileController = {
  getData: async (req, res) => {

    try {

      //res.setHeader("Access-Control-Allow", true);
      const token = req.headers.authorization.split(' ')[1]
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const profile = await Profile.findOne({ email: tokenData.email });
      if (profile) {
        res.send(profile);
        //res.send("Hi");
        console.log("Data sent succesfully");

      } else {
        console.log("Failed to fetch profile data: UnAuthorized");
        res.sendStatus(401);
      }

    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  },
  getPartialData: async (req, res) => {

    const username = req.params['username'];
    console.log(`Requesting partial data for ${username}`)
    try {
      const profileData = await Profile.findOne({ userName: username }).select("userName libraryGames")
      if (profileData) {
        res.send(profileData)
        console.log('Sent partial data')
      }
      else
        res.status(404).send('error')
      console.log(profileData)
    }

    catch (e) {
      res.status(404).send('error')
      console.log(e.message)
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

      const email = fetchEmail(req)
      console.log("email is:" + email);
      const profile = await Profile.findOne({ email: email });

      const cartItems = profile.cart.map(item => ({ ...item, hours: 0 }));

      console.log(cartItems);
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

        const encrypted_pass = await bcrypt.hash(req.body.password, 10);
        newData.password = encrypted_pass
      }

      const email = req.body.email
      const profile = await Profile.findOneAndUpdate(
        { email: email },
        newData
      );
      console.log('Profile Update Success')
      res.send(profile);

    } catch (e) {
      res.send(e.message);
      console.log(e)
    }
  },
  addFriend: async (req, res) => {
    const frienduname = req.params['uname']
    const email = fetchEmail(req)
    try {
      await Profile.findOneAndUpdate({ email: email }, { $addToSet: { 'friendList': frienduname } })
      console.log('Friend Added')
      res.sendStatus(200)
    }
    catch (e) {
      res.status(403).send(e.message)
      console.log(e)
    }
  }
};
export default profileController;
