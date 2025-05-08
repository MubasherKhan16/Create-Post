import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../postListStore";
import { MdDelete } from "react-icons/md";
import Message from "./message";
import LoadingState from "./loadingState";

function Post() {
  const { postList,deletePost,fetchPosts,addPost } = useContext(PostListContext);
  const [fetching,setfetching]=useState(false);
  
//   const onfetchPosts=()=>{
//     fetch('https://dummyjson.com/posts')
// .then(res => res.json())
// .then((data)=>{fetchPosts(data.posts)});
//   }

useEffect(() => {
  setfetching(true); // Start loading
  const controller=new AbortController();
  const signal =controller.signal;
  fetch("https://dummyjson.com/posts",{signal})
    .then((res) => res.json())
    .then((data) => {
      // Add each post to context
      data.posts.forEach((post) => {
        addPost(post.title, post.body, post.tags, post.reactions);
      });
      setfetching(false);
    });
  return () => {
    console.log("Abort");
    controller.abort();
  };
}, []); // Empty dependency array means this runs once on mount

// const [fetchPost,setfetchPosts]=useState(false);
// if(!fetchPost){
//   fetch("https://dummyjson.com/posts")
//   .then((res) => res.json())
//   .then((data) => {
//     data.posts.forEach((post) => {
//       addPost(post.title, post.body, post.tags, post.reactions); 
//     });
//   });
//   setfetchPosts(true);
// }

// const onfetchPosts = () => {
//   fetch("https://dummyjson.com/posts")
//     .then((res) => res.json())
//     .then((data) => {
//       data.posts.forEach((post) => {
//         addPost(post.title, post.body, post.tags, post.reactions); 
//       });
//     });
// };


  return (
    <>
    {fetching && <LoadingState></LoadingState>}
    {!fetching && postList.length===0 && <Message></Message>}
    <div className="row row-cols-1 row-cols-md-3 g-4 post">
      {!fetching &&  postList.map((post) => (
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
