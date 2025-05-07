import { createContext,useReducer } from "react";

export const PostListContext=createContext({
  postList:[],
  addPost:()=>{},
  deletePost:()=>{},
});
const default_value=[
  {
     id:"1",
     title:"Trending News",
     body:"India attack Pakistan",
     reaction:2000,
     userId:"user-1",
     tags:["revenge","forgive"]       
  },
  {
     id:"2",
     title:"Upcoming New",
     body:"Will Pakistan Attack India",
     reaction:3000,
     userId:"user-2",
     tags:["attack","blast"]       
  },
]

const postListReducer=(currentPosts,action)=>{
    let newPosts=currentPosts;
    if(action.type==="DELETE-POST"){
      newPosts=currentPosts.filter(post => post.id !== action.payload.postId);
    }
    else if(action.type==="ADD-POST"){
      newPosts=[action.payload,...currentPosts];
    }
    return newPosts;
}
const PostListContextProvider=({children})=>{

    const[postList,dispatchPostlist]=useReducer(postListReducer,default_value);

    const addPost=(posttitle,posttext,posttags,postreactions)=>{
      dispatchPostlist({
        type:"ADD-POST",
        payload:{
          id:Date.now().toString(),
          title:posttitle,
          body:posttext,
          tags:posttags,
          reaction:parseInt(postreactions),
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

    return (
      <PostListContext.Provider value={{postList,addPost,deletePost}}>
        {children}
      </PostListContext.Provider> 
    )

    
}

export default PostListContextProvider;
