import { useContext } from "react";
import { PostListContext } from "../postListStore";
import { MdDelete } from "react-icons/md";
import Message from "./message";

function Post() {
  const { postList,deletePost,fetchPosts,addPost } = useContext(PostListContext);
  
//   const onfetchPosts=()=>{
//     fetch('https://dummyjson.com/posts')
// .then(res => res.json())
// .then((data)=>{fetchPosts(data.posts)});
//   }

const onfetchPosts = () => {
  fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((data) => {
      data.posts.forEach((post) => {
        addPost(post.title, post.body, post.tags, post.reactions); 
      });
    });
};


  return (
    <>
    {postList.length===0 && <Message onfetchPosts={onfetchPosts}></Message>}
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
              <div>
  Likes: {post.reactions.likes}, Dislikes: {post.reactions.dislikes}
</div>


            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Post;
