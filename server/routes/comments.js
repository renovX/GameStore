import commentController from "../controller/comment.js";
import { Router } from "express";
const commentRouter = Router()
commentRouter.get('/get-comments/:id', commentController.getComments);
commentRouter.post('/add-comment/:id', commentController.addComment);
export default commentRouter