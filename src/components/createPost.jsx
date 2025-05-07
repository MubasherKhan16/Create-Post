import { useContext, useRef } from "react";
import { PostListContext } from "../postListStore";

function CreatePost() {
  const { addPost } = useContext(PostListContext);

  const postTitle = useRef();
  const postText = useRef();
  const postTags = useRef();
  const postReactions = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const posttitle = postTitle.current.value;
    const posttext = postText.current.value;
    const posttags = postTags.current.value.split(" ").map(tag => tag.trim());

    const reactions = postReactions.current.value;
    addPost(posttitle, posttext, posttags,reactions);

    postTitle.current.value = "";
    postText.current.value = "";
    postTags.current.value = "";
    postReactions.current.value = "";
  };
  return (
    <form className="form-container" onSubmit={submitHandler}>
      <div className="mb-3">
        <label className="form-label">Post Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          ref={postTitle}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Post text</label>
        <textarea
          className="form-control"
          id="exampleInputPassword1"
          rows="4"
          ref={postText}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Post tags</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          ref={postTags}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Post reactions</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          ref={postReactions}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default CreatePost;
