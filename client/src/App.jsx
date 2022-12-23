import { Routes, Route } from "react-router-dom";
import { Post } from "./components/Post";
import { PostList } from "./components/PostLists";
import { PostProvider } from "./context/PostContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route
        path="/posts/:id"
        element={
          <PostProvider>
            <Post />
          </PostProvider>
        }
      />
    </Routes>
  );
}

export default App;
