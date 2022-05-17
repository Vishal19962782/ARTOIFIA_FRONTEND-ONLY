import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import Post from "./PostComponent/Post";

function FollowingPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    AxiosBase.get("/api/user/getfollowingArts").then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <>
      {posts?.map((item, index) => {
        return <Post key={index} post={item} />;
      })}
    </>
  );
}

export default FollowingPosts;
