import { useState } from "react";
import { PostList } from "./components/PostLists";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h5>HELLO WORLD</h5>
      <PostList />
    </div>
  );
}

export default App;
