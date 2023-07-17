import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    gameId: {
        type: String,
        required: [true, "gameid is required"],
    },
    gameName: {
        type: String,
    },
    comments: {
        type: Array,
    },
    rating: {
        type: String,
    },

});
const model = mongoose.model("Comments", commentSchema);
export default model;
