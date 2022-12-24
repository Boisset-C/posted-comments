import { usePost } from "../context/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comment";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function Post() {
  const { post, rootComments } = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  const onCommentCreate = (message) => {
    return createCommentFn({ postId: post.id, message }).then((comment) => {
      console.log(comment);
    });
  };
  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
