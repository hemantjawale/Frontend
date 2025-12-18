import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 min-h-screen bg-slate-900 text-slate-200">
      <Container>
        {/* 1. Cinematic Image Section */}
        <div className="w-full relative mb-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover transform transition duration-500 group-hover:scale-105"
          />

          {/* 2. Glassmorphism Action Bar (Only for Author) */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-3 bg-slate-900/70 backdrop-blur-md p-2 rounded-xl border border-slate-700/50 shadow-inner">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500 hover:bg-green-600"
                  className="px-4! py-1! text-sm font-semibold rounded-lg transition-all shadow-md"
                >
                  ✏️ Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-600"
                className="px-4! py-1! text-sm font-semibold rounded-lg transition-all shadow-md"
                onClick={deletePost}
              >
                🗑️ Delete
              </Button>
            </div>
          )}
        </div>

        {/* 3. Title & Meta */}
        <div className="w-full mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            {post.title}
          </h1>
          <p className="text-slate-400 text-sm">
            Written by{" "}
            <span className="text-indigo-400 font-semibold">
              @{userData?.name || "Author"}
            </span>
          </p>
        </div>

        {/* 4. Content Area */}
        {/* Note: 'browser-css' is a custom class. 
                   We add extra tailwind classes here to ensure the parsed HTML text is readable in dark mode.
                */}
        <div className="browser-css text-slate-300 leading-relaxed text-lg space-y-4">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
