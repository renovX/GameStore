import express from "express";
import profileController from "../controller/profile.js";
import verify from "../middleware/verify.js";
const profileRouter = express.Router();
profileRouter.post("/update", verify, profileController.update);
profileRouter.get("/add-to-library", verify, profileController.addToLibrary);
profileRouter.get("/get-data", verify, profileController.getData);
profileRouter.get("/add-friend/:uname", verify, profileController.addFriend)
profileRouter.get('/get-user/:username', profileController.getPartialData)
//authRouter.get("/logout", authController.logOut);

export default profileRouter;
