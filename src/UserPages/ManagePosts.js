import { useEffect, useState } from "react";
import AxiosBase from "../api/AxiosBase";
import BidCard from "../Components/BidCard";

function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [click, setClick] = useState(true);
  useEffect(() => {
    AxiosBase.get("/api/user/ArtistBids").then((res) => {
      
      setPosts(res.data);
    });
  }, [click]);
  return (
    <>
      {posts?.map((item, index) => {
        return (
          <BidCard post={item} key={index} apiCall={setClick} toggle={click} />
        );
      })}
    </>
  );
}

export default ManagePosts;
