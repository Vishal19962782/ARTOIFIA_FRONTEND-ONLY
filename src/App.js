import HomeFeed from "./Components/HomeFeed";
import { Box } from "@mui/system";
import SignIn from "./UserPages/SignIn";
import SignUp from "./UserPages/Singup";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./UserPages/Homepage";
import UserPage from "./UserPages/UserPage";
import ArtistPortfolio from "./UserPages/ArtistPortfolio";
import MyBids from "./UserPages/MyBids";
import ManagePosts from "./UserPages/ManagePosts";
import ProtectedRoutes from "./AuthContext/ProtectedRoutes";
import EventsPage from "./UserPages/EventsPage";
import AddEventPage from "./UserPages/AddEventPage";
import PastOrders from "./UserPages/PastOrders";
import AdminDash from "./AdminPages/AdminDash";
import UserTable from "./AdminPages/AdminComponents/table/UserTable";
import Requests from "./AdminPages/AdminComponents/Users/Requests";
import Bids from "./AdminPages/AdminComponents/Bids/Bids";
import UserIn from "./AdminPages/AdminComponents/UserInsight/UserIn";
import PasswordReset from "./UserPages/PasswordReset";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import FollowingPosts from "./Components/FollowingPosts";
import { useSelector } from "react-redux";
import { getUser } from "./features/Userslice";
import MyTickets from "./UserPages/MyTickets";
import Allorders from "./UserPages/Allorders";
import AdminDashpage from "./AdminPages/AdminDash/AdminDashpage";
import ArtistInsightsPage from "./ArtistInsights/ArtistInsightsPage";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isloggedin, setIsloggedin] = useState(false);
  const UserData = useSelector(getUser);
  const themeSelector = createTheme({
    palette: {
      mode: theme,
      background: {
        backgroundColor: "red",
      },
    },
  });
  return (
    <ThemeProvider theme={themeSelector}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn setLog={setIsloggedin} />} />
            <Route path="/password_reset" element={<PasswordReset />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoutes isLogged={isloggedin} />}>
              <Route
                path="/Home"
                element={<Homepage setTheme={setTheme} theme={theme} />}
              >
                <Route path="" element={<HomeFeed />} />
                {/* <Route path="/orders" element={<PastOrders />} /> */}
                <Route path="allArts" element={<FollowingPosts />} />
                <Route path="managePosts" element={<ManagePosts />} />
                <Route path="orders" element={<Allorders />} />
                <Route path="MyBids">
                  <Route path="" element={<MyBids />} />
                  <Route path="myOrders" element={<PastOrders />} />
                </Route>
                <Route path="events" element={<EventsPage />} />
                <Route path="addEvents" element={<AddEventPage />} />
                <Route path="Mytickets" element={<MyTickets />} />
                <Route path="ArtistInsigths" element={<ArtistInsightsPage />} />
                <Route
                  exact
                  path="hi"
                  element={
                    <>
                      <HomeFeed />
                    </>
                  }
                />
              </Route>

              <Route path="/Home/User" element={<UserPage />} />

              <Route
                path="*"
                element={
                  <Box>
                    <h1>Page not found 404 :(</h1>
                  </Box>
                }
              ></Route>
              <Route path="/userpage" element={<ArtistPortfolio />}>
                <Route path=":id" element={<ArtistPortfolio />} />
              </Route>
            </Route>
            <Route path="/Admin" element={<AdminDash />}>
              <Route path="" element={<AdminDashpage />} />
              <Route path="users" element={<UserTable />} />
              <Route path="Requests" element={<Requests />} />
              <Route path="Bids" element={<Bids />} />
              <Route path="user/:id" element={<UserIn />} />
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
