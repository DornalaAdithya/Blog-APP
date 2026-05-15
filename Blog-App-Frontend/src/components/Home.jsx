import { pageBackground, pageWrapper, section } from "../styles/common";
import { useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";

function Home() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  return (
    <div className={pageBackground}>
      {/* Hero Section */}
      <section className={`${section} mt-5`}>
        <div className={`${pageWrapper} text-center`}>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to MyBlog</h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, explore articles from different authors, and connect through ideas and stories.
          </p>

          <button
            onClick={() => navigate(user?.role === "AUTHOR" ? "/author-profile" : "/user-profile")}
            className="mt-7 px-6 py-3 bg-[#0066cc] text-white rounded-lg hover:bg-[#0262c2] transition"
          >
            {user?.role === "AUTHOR" ? "Publish Articles" : "Explore Articles"}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={section}>
        <div className={pageWrapper}>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why Use MyBlog?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#0066cc]">Write Articles</h3>

              <p className="text-gray-600">Authors can create and manage articles easily with a clean editor.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#0066cc]">Read & Explore</h3>

              <p className="text-gray-600">Discover articles from multiple authors across different topics.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#0066cc]">Engage with Comments</h3>

              <p className="text-gray-600">Share opinions and interact with authors through comments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
