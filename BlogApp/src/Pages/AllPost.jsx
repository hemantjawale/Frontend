import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components"; // Standardized import
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {},[])
    // FIX: API call must be inside useEffect to run only once on mount
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="w-full py-8 min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="text-xl text-indigo-400 font-bold animate-pulse">Loading amazing content...</div>
      </div>
    );
  }

  if (posts.length === 0) {
      return (
          <div className="w-full py-8 min-h-screen bg-slate-900">
              <Container>
                  <div className="text-center text-slate-400 mt-20">
                      <h1 className="text-3xl font-bold mb-4">No Posts Yet</h1>
                      <p>Be the first to write something awesome!</p>
                  </div>
              </Container>
          </div>
      )
  }

  return (
    <div className="w-full py-8 min-h-screen bg-slate-900">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col mb-8 px-2">
            <h1 className="text-3xl font-bold text-white mb-2">
                All Posts
            </h1>
            <div className="w-20 h-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="transform transition duration-300 hover:-translate-y-1">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
export default AllPosts;