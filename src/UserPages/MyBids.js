import { Button, Container, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosBase from "../api/AxiosBase";
import OrderCardComponent from "../Components/OrderCardComponent";
import { getUser } from "../features/Userslice";
import PastOrders from "./PastOrders";

function MyBids() {
  const userData = useSelector(getUser);

  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    AxiosBase.get("/api/user/getBids").then((res) => {
      setPostData(res.data);
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
        {page == 1 ? (
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
