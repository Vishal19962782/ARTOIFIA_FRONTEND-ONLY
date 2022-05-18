import { Button, Container, Divider, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosBase from "../api/AxiosBase";
import OrderCardComponent from "../Components/OrderCardComponent";
import { getUser } from "../features/Userslice";
import PastOrders from "./PastOrders";

function MyBids() {
  const userData = useSelector(getUser);

  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    AxiosBase.get("/api/user/getBids").then((res) => {
      setPostData(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Container sx={{ mr: { lg: "300px", md: "" } }} maxWidth="md">
        <Stack direction>
          <Button onClick={() => setPage(1)}>My Bids</Button>
          <Button onClick={() => setPage(2)}>Paid orders</Button>
        </Stack>
        <Divider />
        {loading ? (
        <Skeleton
          sx={{ mt: "30px" }}
          variant="rect"
          animation="wave"
          width="100%"
          height={200}
        />
      ) : null}
        {page == 1&&!loading ? (
          postData.bids?.map((item, index) => {
            return (
              <Stack p={2}>
                <OrderCardComponent
                setPage={setPage}
                  key={index}
                  userID={userData._id}
                  order={item}
                  orderStats={postData.Notification}
                />
              </Stack>
            );
          })
        ) : (
          <PastOrders />
        )}
      </Container>
    </>
  );
}

export default MyBids;
