import React, { useState, useEffect } from "react";
import  Container  from "../components/Container/Container.jsx";
import appwriteService from "../appwrite/config.js";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm/PostForm.jsx";

function EditPost() {
  const [post, SetPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          SetPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
