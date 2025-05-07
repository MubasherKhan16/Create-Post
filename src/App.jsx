import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import Post from "./components/post";
import CreatePost from "./components/createPost";
import { useState } from "react";
import PostListContextProvider from "./postListStore";

function App() {
 const [currentPage,setCurrentPage] =useState("Home");
  return (
    <PostListContextProvider>
    <div className="layout-container">
      <div className="sidebar-section">
        <SideBar
      currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
      </div>
      <div className="navbar-section">
        <NavBar />
        {currentPage==="Home" && <Post></Post>}
        {currentPage==="Create Post" && <CreatePost></CreatePost>}
      </div>
    </div>
    </PostListContextProvider>
  );
  
}

export default App
