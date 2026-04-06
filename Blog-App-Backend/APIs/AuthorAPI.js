import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

export const authorRoute = exp.Router();

//Register Author(public)
authorRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
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
      role: "AUTHOR",
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

//Create Article(protected)
authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  //Author verification will be done by the middleware

  //get articleObj from req body
  //here we get {title, catergory, content} from the req.body(i.e from user) and we required author is so we get it from req.user
  //we dont not mutate the req.body directly so we are creating a copy of it and modifying it.
  let articleObj = { ...req.body, author: req.user.userId };
  //add the authorid which will be present in req.user

  //create the article document
  const articleDoc = new ArticleModel(articleObj);
  //save it.
  let createdArticleDoc = await articleDoc.save();
  //send the response
  res.status(201).json({ message: "article created", payload: createdArticleDoc });
});

//Read Articles of Author(protected)
authorRoute.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
  //Author verification will be done by the middleware

  //get author id
  const authorId = req.user.userId;

  //read articles
  let articles = await ArticleModel.find({
    author: authorId,
  }).populate("author", "firstName email");

  //send res
  res.status(200).json({ message: "Articles", payload: articles });
});

//Edit Article(protected)
authorRoute.put("/articles/:articleId", verifyToken("AUTHOR"), async (req, res) => {
  //get articleId from URL params
  const { articleId } = req.params;

  //get modified(updated) article from req
  const { title, category, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  // update article only if:
  // 1) article exists
  // 2) article belongs to logged-in author
  // 3) article is active

  const modifiedArticleDoc = await ArticleModel.findOneAndUpdate(
    {
      _id: articleId,
      author: req.user.userId,
      isActiveArticle: true,
    },
    {
      $set: {
        title,
        category,
        content,
      },
    },
    { new: true, runValidators: true },
  );

  if (!modifiedArticleDoc) {
    return res.status(404).json({ message: "Article not found or you don't have permission" });
  }

  //send res
  res.status(200).json({ message: "Article updated", payload: modifiedArticleDoc });
});

//Delete (soft delete) Article(protected)
// authorRoute.patch("/articles", verifyToken("AUTHOR"), async (req, res) => {
//   //get modified article from req
//   let article = req.body;
//   //find the article
//   //check the article is published by the author recived from the client
//   let articleOfDB = await ArticleModel.findOne({
//     _id: article.articleId,
//     author: article.author,
//   });
//   if (!articleOfDB) {
//     return res.status(401).json({ message: "Article Not Found" });
//   }
//   //update the status of isArticleActive
//   let modifiedArticleDoc = await ArticleModel.findByIdAndUpdate(
//     article.articleId,
//     { $set: { isActiveArticle: false } },
//     { new: true, runValidators: true },
//   );
//   //send res
//   res.status(200).json({ message: "article deleted", payload: modifiedArticleDoc });
// });

//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { id } = req.params;
    const { isActiveArticle } = req.body;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // AUTHOR can only modify their own articles
    if (req.user.role === "AUTHOR" && article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Forbidden. You can only modify your own articles",
      });
    }

    // Already in requested state
    if (article.isActiveArticle === isActiveArticle) {
      return res.status(400).json({
        message: `Article is already ${isActiveArticle ? "active" : "deleted"}`,
      });
    }

    // update status
    article.isActiveArticle = isActiveArticle;
    await article.save();

    res.status(200).json({
      message: `Article ${isActiveArticle ? "restored" : "deleted"} successfully`,
      payload: article,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
