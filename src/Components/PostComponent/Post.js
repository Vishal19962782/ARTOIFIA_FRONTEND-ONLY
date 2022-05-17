import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CommentModal from "../CommentModal";
import Axios from "../../api/AxiosBase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import AnimationPages from "../../Outlets/AnimationPages";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import handleBid from "./Bidlogic";
function Post(props) {
  
  // 
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const [bid, setBid] = useState("");
  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(props.post?.postLikes.length);
  const [comments, setComments] = useState(props.post?.postComments);
  const [commentNumber, setCommentNumber] = useState(
    props.post?.postComments.length
  );
  const status = props.post?.Status;
  useEffect(() => {
    setPost(props.post);
    const findLike = props?.post?.postLikes.filter(
      (el) => el.userId?._id == JSON.parse(localStorage.getItem("token")).id
    );
    if (findLike.length) setLike(true);
  }, []);
  const handleLike = () => {
    if (!like) {
      Axios.patch("/api/user/like", {
        postId: post?._id,
      }).then(() => {
        setLike(true);
        setLikeNumber(likeNumber + 1);
      });
    } else {
      
      Axios.patch("/api/user/unlike", { postId: post?._id }).then(() => {
        setLike(false);
        setLikeNumber(likeNumber - 1);
      });
    }
  };
  function handleBid(e) {
    e.preventDefault();
    const bidValue = e.target.value;
    Swal.fire({
      title: `Are you sure you want to bid ${bid} rupees`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, bid it!",
    }).then((res) => {
      if (res.value) {
        Axios.put("/api/user/bid", {
          postId: post?._id,
          bid: bid,
        }).then(() => {
          Swal.fire({
            title: "Bid Successful",
            text: "You have successfully bid",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }).catch((err)=>{
          Swal.fire({
            title: "Bid Failed",
            text: err.response.data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });

        })
      }
    });
  }
  const date = new Date(post.postDate);
  return (
    <AnimationPages>
      <Paper
        elevation={6}
        sx={{ borderRadius: "20px", margin: { xs: "30px" }, width: "80%" }}
      >
        <Card sx={{ borderRadius: "20px" }}>
          <CardHeader
            avatar={
              <Avatar
                src={props?.post?.postOwner?.avatar}
                sx={{ bgcolor: "red" }}
                aria-label="recipe"
              >
                {post?.postOwner?.fname}
              </Avatar>
            }
            action={
              <Typography mt={1} fontWeight={"12px"} fontSize="14px">
                {date.toDateString()}
              </Typography>
            }
            title={post?.postOwner?.fname}
            subheader={post.postName}
            onClick={() => navigate(`/userpage/${props?.post.postOwner?._id}`)}
          />
          <CardMedia
            component="img"
            height="20%"
            image={props.post?.Image}
            alt="Paella dish"
          />
          <CardContent>
            <Accordion elevation={0}>
              <AccordionSummary expandIcon={<AddIcon />}>
                Description: {post?.postDescription?.slice(0, 45)}....
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body3" color="text.secondary">
                  {post.postDescription}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <CardActions disableSpacing>
              <Checkbox
                checked={like}
                icon={<FavoriteIcon />}
                checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
                onClick={handleLike}
              />
              <Typography>{likeNumber}</Typography>
              <CommentModal
                comments={comments}
                postId={props.post?._id}
                commentNumber={commentNumber}
                setCommentNumber={setCommentNumber}
              />
              <Typography>{commentNumber}</Typography>

              <IconButton>
                <PointOfSaleIcon />
              </IconButton>
              <Typography>{props.post?.bids.length}</Typography>
            </CardActions>
            {status !== "Accepted" ? (
              <Stack component="form" direction={"row"}>
                <TextField
                  // height="1"

                  placeholder={"Min. Bid:" + props.post.minPrice}
                  variant={"filled"}
                  onChange={(e) => setBid(e.target.value)}
                  value={bid}
                  InputProps={{ style: { fontSize: 22 } }}
                  error={bid ? props.post.minPrice > bid : false}
                  helperText={
                    bid
                      ? props.post.minPrice > bid
                        ? `Minimum Bid should be greater than Current Price ${props.post.minPrice}`
                        : ""
                      : ""
                  }
                  type="number"
                  name="bid"
                  sx={{ height: "20px", width: "200px" }}
                />
                <IconButton
                  type="submit"
                  disabled={props.post.minPrice > bid}
                  onClick={handleBid}
                  size="large"
                >
                  <CurrencyRupeeIcon />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction={"row"} bgcolor="#e8eaf6">
                <Typography>This art is aleady sold</Typography>
              </Stack>
            )}
            {/* <BookmarkIcon mr={2} /> */}
          </Stack>

          <Collapse timeout="auto" unmountOnExit>
            <CardContent></CardContent>
          </Collapse>
        </Card>
      </Paper>
    </AnimationPages>
  );
}

export default Post;
