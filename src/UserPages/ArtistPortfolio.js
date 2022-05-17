import { Avatar, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import PageImageLIst from "../Components/PageImageLIst";
import { useParams } from "react-router-dom";
import AxiosBase from "../api/AxiosBase";
import styled from "@emotion/styled";
function ArtistPortfolio() {
  const [data, setData] = useState("");
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const { id } = useParams();
  const GridItem = styled(Grid)({
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column-reverse",
    alignItems: "center",
    border: "1px solid #ffffe4",
    backgroundColor: "background.paper",
    borderRadius: "30px",
  });

  useEffect(() => {
    AxiosBase.get(`/route/getUserInfo/${id}`).then((res) => {
      setData(res.data);

      setPosts(res.data.posts);
    
      setFollow(
        res.data.followers.includes(
          JSON.parse(localStorage.getItem("token")).id
        )
      );
    });
  }, []);
  function countLikes() {
    return posts.reduce((prev, curr) => {
      return prev + curr.postLikes.length;
    }, 0);
  }
  function countComments() {
    return posts.reduce((prev, curr) => {
      return prev + curr.postLikes.length;
    }, 0);
  }
  function HandleFollow() {
    AxiosBase.post(`/route/followUser/${id}`)
      .then((res) => {
        // setData(res.data)
        console.log(follow);
        setFollow(!follow);
        console.log(follow);
      })
      .then(() => {
        AxiosBase.get(`/route/getUserInfo/${id}`).then((res) => {
          setData(res.data);
          setPosts(res.data.posts);
        });
      });
  }
  return (
    <>
      <Navbar />
      {/* <Sidebar/> */}

      <Container sx={{ mt: "60px" }}>
        <Grid container sx={{ padding: "20px", paddingTop: "30px" }}>
          <Grid display="flex" justifyContent={"center"} item xs={12} lg={4}>
            <Avatar
              src={data?.avatar}
              sx={{ width: "200px", height: "200px" }}
            ></Avatar>
          </Grid>
          <Grid item lg={8}>
            <Stack gap={4}>
              <Stack direction={"row"} justifyContent="space-between">
                <Typography
                  textAlign={{ xs: "left", sm: "left", md: "left", lg: "left" }}
                  variant="h4"
                >
                  {data?.fname} {data?.lname}
                </Typography>
                <Box pr={3}>
                  <Button
                    sx={{ width: "100px" }}
                    onClick={HandleFollow}
                    variant={!follow ? "contained" : "outlined"}
                    color="primary"
                  >
                    {follow ? "unfollow" : "follow"}
                  </Button>
                </Box>
              </Stack>
              <Box>
                <Typography variant="h7" color={"#424242"}>
                  {data?.bio}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: "10px", mb: "20px" }} />
        <Stack
          // bgcolor={"#fafafa"}
          gap={2}
          direction
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid container sx={{ width: "500px", height: "450px" }}>
            <GridItem item sm={5}>
              <Typography variant="h12">likes</Typography>
              <Typography variant="h2" component={"a"}>
                {countLikes()}
              </Typography>
            </GridItem>
            <GridItem item sm={5}>
              <Typography variant="h12">Comments</Typography>
              <Typography variant="h2" component={"a"}>
                {countComments()}
              </Typography>
            </GridItem>
            <GridItem item sm={5}>
              <Typography variant="h12">Posts</Typography>
              <Typography variant="h2" component={"a"}>
                {posts.length}
              </Typography>
            </GridItem>
            <GridItem item sm={5}>
              <Typography variant="h12">Followers</Typography>
              <Typography variant="h2" component={"a"}>
                {data?.followers?.length}
              </Typography>
            </GridItem>
          </Grid>
          <PageImageLIst posts={data?.posts} />
        </Stack>
      </Container>
    </>
  );
}

export default ArtistPortfolio;
