import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AxiosBase from "../api/AxiosBase";
import BidCard from "../Components/BidCard";
import { Skeleton } from "@mui/material";
function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(true);
  useEffect(() => {

    AxiosBase.get("/api/user/ArtistBids").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [click]);
  return (
    <>
      {loading ? (
        <Skeleton variant="rect" animation="wave" width="100%" height={200} />
      ) : null}
      {posts?.map((item, index) => {
        return (
          <BidCard post={item} key={index} apiCall={setClick} toggle={click} />
        );
      })}
      {posts?.length == 0&&!loading ? (
        <Typography
          variant="h3"
          sx={{ opacity: "0.3", color: "text.primary" }}
          textAlign={"center"}
        >
          No Posts yet{" "}
        </Typography>
      ) : null}
    </>
  );
}

export default ManagePosts;
