import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "../api/AxiosBase";
import { useState } from "react";
import Swal from "sweetalert2";

function BidCard({ post, apiCall, click }) {
  const maxBid =
    post.bids.length == 0
      ? null
      : post.bids.reduce((a, b) => (a.bidPrice > b.bidPrice ? a : b));

  const PostDate = new Date(post?.date);
  const [status, setStatus] = useState(post.Status);
  const bidDate = new Date(maxBid?.date);

  function handleClick(e) {
    axios
      .post("/api/user/AcceptBid", {
        userId: maxBid.userId,
        postId: post._id,
        bidId: maxBid._id,
        postName: post.postName,
        price: maxBid.bidPrice,
      })
      .then(() => {
        setStatus("Accepted");
        apiCall(!click);
        Swal.fire({
          title: "Bid Accepted",
          text: "You have accepted the bid",
          icon: "success",
          confirmButtonText: "OK",
        });
      });
  }
  const postStatus = () => {
    if (post.Status == "Accepted") {
      return (
        <Chip color="warning" label={'This bid has been accepted waiting for customer to make payment'}>
          
        </Chip >
      );
    }
    if (post.Status == "Sold") {
      return <Chip color="success" label={'This art has been sold'}/>
    }
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Accordion elevation={9}>
        <AccordionSummary elevation={0}>
          <Card sx={{ display: "flex", flexGrow: "1" }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={post?.Image}
              alt="no image"
            />
            <Stack
              p={4}
              width="100%"
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <Box sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h4" component="p">
                    {post?.postName}
                  </Typography>
                  {maxBid ? (
                    <Typography variant="h6" component="h1">
                      Bid price:{maxBid?.bidPrice}
                    </Typography>
                  ) : (
                    <Typography variant="h6" component="h1">
                      No bids yet
                    </Typography>
                  )}
                  <Typography variant="h8" component="p">
                    {maxBid ? "Bid Date : " + bidDate?.toDateString() : null}
                  </Typography>
                  {postStatus()}
                </Box>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            {maxBid && status != "Accepted" && status!="Sold" ? (
              <Button
                onClick={() => handleClick()}
                variant="contained"
                sx={{ borderRadius: "11px 11px 0px 0px" }}
                // sx={{ maxWidth: "170px" }}
                size="large"
                fullWidth
              >
                Accept bid for ₹{maxBid?.bidPrice}
              </Button>
            ) : null}
            {/* <Typography>{post?.postDescription}</Typography> */}
            <CardMedia
              component="img"
              // sx={{ width: 150 }}
              image={post?.Image}
              alt="no image"
              sx={{
                borderRadius: "0px 0px 11px 11px",
                "&:hover": { color: "warning" },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default BidCard;
