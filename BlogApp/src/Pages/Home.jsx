import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";

function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);
  if (post.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-900 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Background Decor: Subtle Grid & Gradient Orbs */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <Container>
          <div className="flex flex-col items-center text-center z-10 relative">
            {/* Modern Badge */}
            <span className="px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-300 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
              Welcome to the future
            </span>

            {/* Hero Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Publish your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
                passions & ideas.
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              A modern space for developers and creators to share their stories.
              Login to read community posts or start writing your own today.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // STATE 2: Posts Exist -> Show Grid Layout
  return (
    <div className="w-full py-12 min-h-screen bg-slate-900">
      <Container>
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <p className="text-slate-400 mt-1">
              Discover what's trending today
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-800 ml-8 mb-4"></div>
        </div>

        {/* Responsive Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {post.map((post) => (
            <div
              key={post.$id}
              className="transform transition duration-300 hover:-translate-y-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
