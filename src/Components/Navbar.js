import { useState } from "react";
import { AppBar, Avatar, Box, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import BrushIcon from "@mui/icons-material/Brush";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/Userslice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const SearchBar = styled("div")(({ theme }) => ({
  // backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "3px",
  width: "40%",
}));
const Icons = styled("div")(({ theme }) => ({
  // backgroundColor: "white",
  gap: "20px",
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));
function Navbar() {
  const UserDetails = useSelector(getUser);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    
    localStorage.removeItem("token");
    navigate("/");
  };
  //    
  return (
    <AppBar>
      <StyledToolbar>
        <Typography
          fontFamily={"Satisfy"}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/home");
          }}
          variant="h5"
        >
          Artofia.
        </Typography>
        <BrushIcon
          sx={{
            display: { xs: "none", sm: "none" },
          }}
        ></BrushIcon>
        <SearchBar>
          {/* <AsyncSearch></AsyncSearch> */}
        </SearchBar>
        <Icons spacing={4}>
          <Stack direction="row" alignItems={"center"} spacing="20px">
            <UserBox onClick={() => setOpen(true)}>
              {" "}
              <Avatar
                sx={{
                  height: "40px",
                  width: "40px",
                }}
                alt="No avatar"
                src={UserDetails.avatar}
              />
              <Typography
                variant="span"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                {UserDetails?.fname}
              </Typography>
            </UserBox>
          </Stack>
        </Icons>
      </StyledToolbar>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/userpage/${UserDetails?._id}`);
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/Home/User");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
