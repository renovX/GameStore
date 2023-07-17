import express from "express";
import mongoose from "mongoose";
import Profile from "../model/Profile.js";
import Comments from "../model/Comment.js"

const commentController = {
    addComment: async (req, res, next) => {
        const gameId = req.params["id"];
        console.log('adding comm')
        const { gameName, profileId, commdata, rate } = req.body;
        try {
            //finding whether comment collection for game is present
            console.log(profileId)
            const commentdoc = await Comments.findOne({ gameId: gameId })
            const { userName, libraryGames } = await Profile.findById(new mongoose.Types.ObjectId(profileId))
            const x = libraryGames.find(game => game.id == gameId)
            let hours = 0
            if (x)
                hours = x.hours
            const newcomment = { profileId: profileId, uname: userName, rate: rate, hours: hours, data: commdata }
            if (commentdoc) {
                //searching for old posted user comment
                const ucomment = commentdoc.comments.findIndex(c => (c.uname == userName))
                if (ucomment > -1)
                    commentdoc.comments[ucomment] = newcomment
                else
                    commentdoc.comments.push(newcomment)
                commentdoc.save();
            }
            else {
                //if not, create new collection
                await Comments.create({ gameId: gameId, gameName: gameName, comments: [newcomment,], rating: 0 })
                console.log('created new comment')

            }
            console.log(newcomment)
            res.send("Comment Add Success");
            console.log("comment added");

        } catch (e) {
            res.send("Failed" + e);
            console.log(e)
        }
    },
    getComments: async (req, res, next) => {

        const gameId = req.params["id"];
        console.log('inside get comment')
        try {

            const commentDoc = await Comments.findOne({ gameId: gameId });
            if (commentDoc) {

                res.send(commentDoc.comments);
            } else {
                console.log("Not comment found");
                //res.send("NotFound");
            }
        } catch (e) {
            console.log("Error:" + e);
            res.send(e);
        }
    },
};
export default commentController;
