import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { addUserDetails, getUser } from "../features/Userslice";
import UserDetail from "../Components/UserDetailComponent";
import Sidebar from "../Components/Sidebar";
import AxiosBase from "../api/AxiosBase";
import Swal from "sweetalert2";
import AddressModal from "./AddressModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArtistRequest from "../Components/ArtsitRequest";

const StyledBox = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid black",
});

function UserPage() {
  const UserDetails = useSelector(getUser);
  const [img, setImg] = React.useState(UserDetails.avatar);
  const dispatch = useDispatch();
  const [editObj, setEditObj] = React.useState(UserDetails);
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async () => {
    try {
      const response = await AxiosBase.put("/route/updateUser", editObj);
      dispatch(addUserDetails(response.data));
      Swal.fire("Success", "User Details Updated", "success");
    } catch (err) {
      
      Swal.fire("Error", "Error in Updating", "error");
    }
  };
  const changeProfileImage = async (e) => {
    try {
      e.preventDefault();
      
      const file = img;
      const formData = new FormData();
      formData.append("file", file);
      const response = await AxiosBase.post("/route/updateProfileImage", formData)

      setImg(response.data.image)
      Swal.fire({
        title: "Success",
        text: "Profile Image Updated",
        icon: "success",
      })
    }
    catch (err) {
      Swal.fire({
        title: "Error",
        text: "Error in Updating",
        icon: "error",
      })
    }

  }
  return (
    <Box overflow="hidden">
      <ArtistRequest />
      <Navbar />
      <Stack mt={"90px"} spacing={2}>
        <Box display={{ sm: "none", lg: "block" }}>
          <Sidebar />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "column", md: "column" }}
          columnGap={3}
          rowGap={3}
          justifyContent="center"
        >
          <Container maxWidth={"md"}>
            <Stack direction="column" justifyContent={"center"}>
              <Stack
                borderRadius={2}
                direction={"column"}
                gap={2}
              // ml={{lg:35,md:25,sm:0}}
              // mr={{lg:35,md:25,sm:0}}

              >
                <Paper elevation={12} sx={{ padding: "30px" }}>
                  <Typography variant={"h4"}>User Info</Typography>
                  <Divider sx={{ mb: "10px" }} />
                  <Box display="flex" alignItems={"center"} gap={3} component="form" onSubmit={changeProfileImage} >
                    <Avatar sx={{ width: "100px", height: "100px" }} src={img} />
                    <Stack justifyContent={"center"} alignItems="center"  >
                      <input type="file" onChange={event => setImg(event.target.files[0])} />
                      <Button size="small" type="submit" >Upload image</Button>
                    </Stack>
                  </Box>
                  <Stack justifyContent="space-between" divider={<Divider />} direction={{ xs: "column", md: "row" }}>
                    <UserDetail
                      edit
                      editObj={editObj}
                      setEditObj={setEditObj}
                      item={"FirstName"}
                      selector="fname"
                      value={UserDetails.fname}
                    />

                    <UserDetail
                      edit
                      item={"LastName"}
                      editObj={editObj}
                      setEditObj={setEditObj}
                      selector="lname"
                      value={UserDetails.lname}
                    />
                  </Stack>
                  <Stack justifyContent="space-between" direction={{ xs: "column", md: "row" }}>
                    <UserDetail
                      edit
                      item={"Email"}
                      editObj={editObj}
                      setEditObj={setEditObj}
                      selector="email"
                      value={UserDetails.email}
                    />

                    <UserDetail
                      edit
                      item={"Phone"}
                      editObj={editObj}
                      setEditObj={setEditObj}
                      selector="phoneNo"
                      value={UserDetails.phoneNo}
                    />
                  </Stack>
                  <UserDetail
                    edit
                    item={"Password"}
                    editObj={editObj}
                    setEditObj={setEditObj}
                    selector="password"
                    value={UserDetails.password}
                  />

                  <UserDetail
                    item={"Account Type"}
                    value={UserDetails.isArtist ? "Artist" : "User"}

                  >
                    not
                  </UserDetail>
                  {UserDetails == editObj ? null : (
                    <Button onClick={() => handleSubmit()}>Save Changes</Button>
                  )}
                  <Checkbox
                    checked={editObj.isArtist}
                    onChange={() =>
                      setEditObj({ ...editObj, isArtist: !editObj.isArtist })
                    }
                  />

                </Paper>
              </Stack>

            </Stack>
            <Divider sx={{ m: "20px" }} />

            <Stack direction="coloumn" justifyContent={"center"}>
              <Stack
                sx={{ width: "100%" }}
                // border={1}
                borderRadius={2}
                alignItems="center"
                justifyContent="space-between"
                direction={"column"}
                gap={1}

              >
                <Paper elevation={12} sx={{ padding: "30px", width: "100%", mb: "30px " }}>
                  <Box sx={{ minWidth: { xs: "380px" } }}>
                    <Typography variant={"h4"}>Address</Typography>
                    <Divider sx={{ mb: "10px" }} />
                    {UserDetails?.addressArray?.map((item, index) => {
                      return (
                        <Accordion>
                          <AccordionSummary
                            id="panel1-header"
                            expandIcon={<ExpandMoreIcon />}
                          >
                            {" "}
                            <Typography variant={"h6"}>
                              Address {index + 1}
                            </Typography>{" "}
                          </AccordionSummary>
                          <AccordionDetails>

                            <Box>
                              <Typography>Address:{item.address}</Typography>
                            </Box>
                            <Box>
                              <Typography>City:{item.city} </Typography>
                            </Box>
                            <Box>
                              <Typography>State:{item.state}</Typography>
                            </Box>
                            <Box>
                              <Typography>Pincode:{item.zip} </Typography>
                            </Box>
                            <Box>
                              <Typography>Country:{item.country}</Typography>
                            </Box>

                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                  {/* <Button fullWidth onClick={() => { }}>add</Button> */}
                  <AddressModal />
                </Paper>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UserPage;
