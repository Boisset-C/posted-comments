import React, { useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/post";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  const [comments, setComments] = useState([]);
  const commentsByParentId = useMemo(() => {
    if (comments == null) return [];
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (post?.comments == null) return;
    setComments(post.comments);
  }, [post?.comments]);

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
