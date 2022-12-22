import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PostList } from "./components/PostLists";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<h1>Post</h1>} />
    </Routes>
  );
}

export default App;
