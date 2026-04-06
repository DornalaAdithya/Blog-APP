import { Schema, model } from "mongoose";

//userCommentSchema
const userCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comment: {
    type: String,
  },
});

const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "author id required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    comments: [userCommentSchema],
    isActiveArticle: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  },
);

export const ArticleModel = model("article", articleSchema);
