import { useEffect, useState } from "react";
// import Post from "./PostComponent/Post";
import { useDispatch } from "react-redux";
// import axios from 'axios'
import { useSelector } from "react-redux";
import Post from "./PostComponent/Post";
import { fetchAsyncPosts, getAllPosts } from "../features/PostSlice";
import { Skeleton } from "@mui/material";
import AnimationPages from "../Outlets/AnimationPages";
function Feed() {
  const [loading, setLoading] = useState(true);
  const activepost = useSelector(getAllPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncPosts())
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <AnimationPages>
          <Skeleton variant="rect" animation="wave" width="80%" height="100%" />
          <Skeleton
            sx={{ m: "10px" }}
            variant="circular"
            animation="wave"
            width="60px"
            height="60px"
          />
          <Skeleton variant="rect" animation="wave" width="80%" height="70vh" />
        </AnimationPages>
      ) : (
        activepost.map((item, index) => {
          return <Post key={index} post={item} />;
        })
      )}
    </>
  );
}

export default Feed;
