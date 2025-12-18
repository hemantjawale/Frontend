import React from "react";
import { Container } from "../components/Container/Container.jsx";
import { PostForm } from "../components/PostForm/PostForm.jsx";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
