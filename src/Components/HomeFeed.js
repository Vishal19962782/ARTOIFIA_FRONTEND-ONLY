import { useEffect } from "react";
// import Post from "./PostComponent/Post";
import { useDispatch } from "react-redux";
// import axios from 'axios'
import { useSelector } from "react-redux";
import Post from "./PostComponent/Post";
import { fetchAsyncPosts, getAllPosts } from "../features/PostSlice";

function Feed() {
  const activepost = useSelector(getAllPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(fetchAsyncPosts());
  }, []);

  return (
    <>
      {activepost.map((item, index) => {
        return <Post key={index} post={item} />;
      })}
    </>
  );
}

export default Feed;
