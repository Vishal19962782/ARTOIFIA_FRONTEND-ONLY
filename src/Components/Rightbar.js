import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TrendingArts from "./TrendingArts";
import TrendingArtists from "./TrendingArtists";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../features/Userslice";
import { useRef } from "react";
const socket = io("/");
function Rightbar() {
  const user = useSelector(getUser);
  const messageEndRef = useRef(null);
  const [page, setPage] = useState(2);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (text) {
      try {
        socket.emit("SendMessage", {
          user: user.fname,
          message: text,
          avatar: user.avatar,
        });
        setMessages([...messages, { user: "me", message: text }]);
        setText("");
      } catch (err) {}
    }
  };
  useEffect(() => {
    socket.on("RecieveMessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (user.fname != undefined) {
      socket.emit("ping", {
        message: `${user?.fname} just joined the chat`,
      });
    }
  }, [user]);
  //   useEffect(()=>{
  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   },[])
  return (
    <>
      <Box
        border={"1px solid white"}
        sx={{ display: { sm: "none", xs: "none", md: "block" } }}
        width="370px"
        alignItems="center"
        // p="2"
      >
        {page == 1 ? (
          <Paper
            sx={{
              padding: "10px",
              position: "fixed",
              right: "0px",
              height: "100vh",
              top: "60px",
            }}
            elevation={2}
            marginRight={"20px"}
          >
            <Button
              fullWidth
              onClick={() => {
                setPage(2);
              }}
            >
              Switch to Chat
            </Button>
            <Typography fontWeight={100} variant="h6">
              Trending Artists
            </Typography>
            <TrendingArtists />
            <Typography fontWeight={100} variant="h6">
              Trending Posts
            </Typography>
            <TrendingArts />
            {/* <PostModal open={true} id={"626f833fcac84aad11e586f7"} /> */}
          </Paper>
        ) : (
          <Paper
            sx={{
              padding: "10px",
              position: "fixed",
              right: "0px",
              top: "60px",
              backgroundColor: "",
              height: "100vh",
            }}
            elevation={2}
            marginRight={"20px"}
          >
            <Button
              fullWidth
              variant="text"
              onClick={() => {
                setPage(1);
              }}
            >
              Turn off Chat
            </Button>
            <Stack sx={{ width: "360px", height: "86vh" }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant={"h5"} textAlign={"left"}>
                  Chat Room {JSON.stringify(messages.count)}
                </Typography>
                <Divider />
              </Box>
              <Box
                sx={{
                  //   display: "flex",
                  flexGrow: "1",
                  p: "10px",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                    width: "0.5em",
                    // color:"red",
                    // background:"blue"
                  },
                }}
              >
                <ul>
                  {messages.map((item) => {
                    return (
                      <Box
                        display={"flex"}
                        flexDirection={
                          item.user == "me" ? "row-reverse" : "row"
                        }
                        alignItems="center"
                        gap="10px"
                      >
                        <Stack justifyContent={"center"} alignItems="center">
                          <Avatar src={item.avatar} />
                          <Stack
                            direction
                            alignItems={"end"}
                            justifyContent={"center"}
                          >
                            <Typography fontSize={8} variant="h11">
                              {new Date().getHours() +
                                ":" +
                                new Date().getMinutes()}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Paper
                            elevation={3}
                            sx={{
                              backgroundColor:
                                item.user == "me" ? "error.dark" : "info.dark",
                              p: "10px 15px 10px 15px",
                              borderRadius: "13px",
                              // display: "flex",
                              flexDirection: "column",
                              mt: "5px",
                              gap: "1px",
                              color: "background.paper",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              {item.message}
                            </Typography>
                          </Paper>
                          <Typography  fontSize={10}>{item.user}</Typography>
                        </Stack>
                      </Box>
                    );
                  })}
                  <div ref={messageEndRef} />
                </ul>
              </Box>
              <Stack onSubmit={sendMessage} component={"form"} direction>
                <TextField
                  variant="filled"
                  name="text"
                  placeholder="Type here...."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  fullWidth
                />
                <IconButton
                  type="submit"
                  sx={{
                    borderRadius: "0px",
                    backgroundColor: "primary.dark",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Box>
    </>
  );
}

export default Rightbar;
