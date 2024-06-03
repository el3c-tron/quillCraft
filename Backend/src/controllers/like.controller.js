import { ApiError } from "../utils/apiError.js";
import { ApiResponse} from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js"
import mongoose from "mongoose";

const liked = asyncHandler( async(req, res) => {

    const {blogId} = req.params;
    const userId = req.user?._id;

    if(!blogId || !userId) throw new ApiError(402, "likeController :: like :: UnAuthorized");

    const likeDoc = await Like.create(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId)
        }
    );

    const likeDocument = await Like.findById(likeDoc._id);

    if(!likeDocument) throw new ApiError(500, "likeController :: like :: Error on registring like");

    return res
            .status(200)
            .json(
                new ApiResponse(200, likeDocument, "Successfully registered like")
            );

} );

const disliked = asyncHandler( async(req, res) => {

} );

export {
    liked,
    disliked
}