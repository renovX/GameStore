import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
  userName:
  {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: Array,
  },
  friendList:
  {
    type: Array
  },
  libraryGames: {
    type: Array,
  },
  cart: {
    type: Array,
  },
});
const model = mongoose.model("Profile", profileSchema);
export default model;
