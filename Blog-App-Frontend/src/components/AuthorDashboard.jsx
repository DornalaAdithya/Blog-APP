import { useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { articleBody, articleCardClass, articleGrid, articleTitle, errorClass, ghostBtn, loadingClass, timestampClass } from "../styles/common";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AuthorDashboard() {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArticles() {
      // console.log("useEffect");
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/author-api/articles", { withCredentials: true });
        // console.log(res.data.payload);
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}
      <div className="flex justify-end mb-6 mt-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div key={articleObj._id} className={articleCardClass} onClick={() => gotoArticle(articleObj)}>
            <div className="flex flex-col h-full">
              <div>
                <h3 className={articleTitle}>{articleObj.title}</h3>
                <p className={articleBody}>{articleObj.content.slice(0, 15)}...</p>
                {/* <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p> */}
              </div>
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorDashboard;
