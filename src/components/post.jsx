import { useContext } from "react";
import { PostListContext } from "../postListStore";
import { MdDelete } from "react-icons/md";


function Post() {
  const { postList,deletePost } = useContext(PostListContext);


  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 post">
      {postList.map((post) => (
        <div className="col" key={post.id}>
          <div className="card position-relative">
            <MdDelete className="delete-icon" onClick={()=>{
              deletePost(post.id)
            }} />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <div className="tags">
                {post.tags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-primary btn-sm m-1"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="alert alert-primary reactions" role="alert">
                This Post has been viewed by {post.reaction} people.
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
