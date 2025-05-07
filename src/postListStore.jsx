import { createContext,useReducer } from "react";

export const PostListContext=createContext({
  postList:[],
  addPost:()=>{},
  fetchPosts:()=>{},
  deletePost:()=>{},
});
// const default_value=[
//   {
//      id:"1",
//      title:"Trending News",
//      body:"India attack Pakistan",
//      reaction:2000,
//      userId:"user-1",
//      tags:["revenge","forgive"]       
//   },
//   {
//      id:"2",
//      title:"Upcoming New",
//      body:"Will Pakistan Attack India",
//      reaction:3000,
//      userId:"user-2",
//      tags:["attack","blast"]       
//   },
// ]


const postListReducer=(currentPosts,action)=>{
    let newPosts=currentPosts;
    if(action.type==="DELETE-POST"){
      newPosts=currentPosts.filter(post => post.id !== action.payload.postId);
    }
    else if(action.type==="ADD-POST"){
      newPosts=[action.payload,...currentPosts];
    }
    else if(action.type==="FETCH-POST"){
      newPosts=action.payload.posts;
    }
    return newPosts;
}
const PostListContextProvider=({children})=>{

    const[postList,dispatchPostlist]=useReducer(postListReducer,[]);

    const addPost=(posttitle,posttext,posttags,postreactions)=>{
      dispatchPostlist({
        type:"ADD-POST",
        payload:{
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title:posttitle,
          body:posttext,
          tags:posttags,
          reactions:postreactions,
        }
      })
    };
    const deletePost=(postId)=>{
      dispatchPostlist({
        type:"DELETE-POST",
        payload:{
          postId,
        }
      })
    };

    const fetchPosts=(posts)=>{
      dispatchPostlist({
        type:"FETCH-POST",
        payload:{
          posts,
        }
      })
    };

    return (
      <PostListContext.Provider value={{postList,addPost,deletePost,fetchPosts}}>
        {children}
      </PostListContext.Provider> 
    )

    
}

export default PostListContextProvider;
