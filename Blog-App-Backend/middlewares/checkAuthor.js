import { UserTypeModel } from "../models/UserTypeModel.js";

export const checkAuthor = async (req, res, next) => {
  //get authorId
  let authorId = req.body?.author || req.params?.authorId;
  //verify author
  let author = await UserTypeModel.findById(authorId);
  //if author not found
  if (!author) {
    return res.status(401).json({ message: "Author Not found" });
  }
  //if author is found but role is different
  if (author.role !== "AUTHOR") {
    return res.status(403).json({ message: "User is not an Author" });
  }
  //if author is blocked
  if (!author.isActive) {
    return res.status(403).json({ message: "Author account is not Active" });
  }
  //forward req to next
  next();
};
