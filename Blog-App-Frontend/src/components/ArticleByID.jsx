import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../stores/authStore";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  formTitle,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/user-api/article/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isActiveArticle;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(`/author-api/articles/${id}/status`, { isActiveArticle: newStatus }, { withCredentials: true });

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${article._id}`, { state: articleObj });
  };

  const commentForm = async (commentObj) => {
    const comments = { articleId: id, comment: commentObj.comment };
    try {
      const res = await axios.post("/user-api/articles", comments, { withCredentials: true });
      toast.success("comment successful");
      setArticle(res.data.payload);
    } catch (err) {
      toast.error(err.response?.data?.message || "comment failed");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isActiveArticle ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>

      {/* USER */}
      {user?.role === "USER" && (
        <div className="my-3">
          <h3 className="my-3">write comment</h3>
          <form onSubmit={handleSubmit(commentForm)}>
            <input type="text" {...register("comment")} className={inputClass} placeholder="write comment.." />
            <button type="submit" className="px-2 py-1 bg-green-500 rounded m-2 text-white hover:bg-green-400">
              post
            </button>
          </form>
        </div>
      )}

      {/* comments */}
      <div>
        {article?.comments?.length > 0 ? (
          article.comments.map((c) => (
            <div key={c._id} className="mb-3">
              <p className="font-semibold">{c.user?.email || "User"}</p>
              <p>{c.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default ArticleByID;
