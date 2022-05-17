import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Add from "../Components/Add";
import Navbar from "../Components/Navbar";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Feedoutlet from "../Outlets/Feedoutlet";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, getUser } from "../features/Userslice";

function Homepage({setTheme,theme}) {
  const Userr = useSelector(getUser);
  const { isArtist } = Userr;
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [feedState, setFeedState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    document.title = "Homepage";
    const Local = JSON.parse(localStorage.getItem("token"));
    

    axios
      .get("http://localhost:9000/route/homepage", {
        headers: { accesstoken: "bearer " + JSON.stringify(Local.token) },
      })
      .then((res) => {
        dispatch(addUserDetails(res.data));
        setUser(res.data);
      });
  }, []);
  return (
    <div>
      <Box color={"text.primary"}>
        <Box height={90}>
          <Navbar user={Userr}></Navbar>
        </Box>
        <Stack
          direction="row"
          mt={"10px"}
          spacing={2}
          justifyContent="space-between"
        >
        
          <Sidebar setTheme={setTheme} theme={theme} />

          <Feedoutlet />
        
            <Rightbar />
         
        </Stack>
        {isArtist ? <Add /> : null}
      </Box>
    </div>
  );
}

export default Homepage;
