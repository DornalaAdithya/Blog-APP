import { config } from "dotenv";
import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

config();

export const userRoute = exp.Router();

//Register User(public)
// userRoute.post("/users", async (req, res) => {
//   //get userObject from req
//   let userObj = req.body;
//   //call register function
//   const newUserObj = await register({ ...userObj, role: "USER" });
//   //send response
//   res.status(201).json({ message: "User Created", payload: newUserObj });
// });
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    let userObj = req.body;

    //  Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // Step 2: call existing register()
    const newUserObj = await register({
      ...userObj,
      role: "USER",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    // Step 3: rollback
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err); // send to your error middleware
  }
});

//Read All Articles(protected)
userRoute.get("/articles", verifyToken("USER"), async (req, res) => {
  //read all the articles from the article collection
  // console.log("entered");
  let articles = await ArticleModel.find({ isActiveArticle: true }).populate("comments.user", "email firstName");
  // console.log("oevr");
  if (articles.length === 0) {
    return res.status(404).json({ message: "articles empty", payload: articles });
  }
  res.status(200).json({ message: "All Articles", payload: articles });
});

//comment on articles(protected)
userRoute.post("/articles", verifyToken("USER"), async (req, res) => {
  let { articleId, comment } = req.body;
  // console.log(user);

  //comment cannont be empty
  if (!comment || comment.trim() === "") {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  //find article by id and update
  let articleWithComment = await ArticleModel.findOneAndUpdate(
    { _id: articleId, isActiveArticle: true },
    {
      $push: { comments: { user: req.user.userId, comment } },
    },
    { new: true, runValidators: true },
  ).populate("comments.user", "firstName email");

  //if article not found
  if (!articleWithComment) {
    return res.status(404).json({ message: "Article not found or inactive" });
  }

  //send response
  return res.status(200).json({ message: "comment added!", payload: articleWithComment });
});
