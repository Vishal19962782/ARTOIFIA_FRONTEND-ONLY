import { Box, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getUser } from "../features/Userslice";
import PaymentComponent from "./PostPayment";

function OrderCardComponent({ order, userID, orderStats,setPage }) {
  const userData = useSelector(getUser);
  const post = order.postId;
  const userBid = post.bids.filter((bid) => userID == bid.userId);
  const bidDate = new Date(order.date);
  JSON.stringify(order);
  const color =
    order.Status == "Accepted"
      ? "success.light"
      : order.Status == "Rejected"
      ? "error.light"
      : "text.primary";

  const status = () => {
    if (order.Status == "Accepted" && order.postId.soldTo == userData?._id) {
      return (
        <Typography>
          This bid has been accepted please make the payment
        </Typography>
      );
    }
    if (order.Status == "Accepted" && order.postId.soldTo != userData?._id) {
      return (
        <Typography>
          This bid has been sold to another user +{" "}
          {JSON.stringify(order.postId.soldTo)}
        </Typography>
      );
    }
    if (order.Status == "Sold") {
      return <Typography>This art has been sold</Typography>;
    }
    if (order.Status == "Bidding") {
      return <Typography>This bid is still in bidding</Typography>;
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={post.Image}
          alt="no image"
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Stack gap="10px" direction alignItems={"center"}>
              <Typography variant="h4" color={color} component="p">
                {post.postName}
              </Typography>
              <Chip
                variant="filled"
                color="warning"
                label={order.price + " ₹"}
              />
            </Stack>

            <Typography mt={1} variant="h8" component="p">
              {bidDate.toDateString()}
            </Typography>
            {/* {status()} */}
            <Chip sx={{mt:"10px"}} label={status()} />
          </CardContent>
          <CardActions
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          >
            {order.Status == "Accepted" ? (
              <PaymentComponent setPage={setPage} order={order} />
            ) : null}
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}

export default OrderCardComponent;
