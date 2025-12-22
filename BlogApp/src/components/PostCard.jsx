import React from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // console.log("Post ID:", $id);
  // console.log("Featured Image ID:", featuredImage);
  
  const previewUrl = appwriteService.getFilePreview(featuredImage);
  // console.log("Generated URL:", previewUrl);
  return (
   <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

        <div className="w-full h-60 overflow-hidden">
          {featuredImage && (   // ✅ guard
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          )}
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-200 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
