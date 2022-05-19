import AdminApp from "./AdminApp";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, getUser } from "../features/Userslice";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
function AdminDash() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    AxiosBase.get("/route/homepage")
      .then((res) => {
        dispatch(addUserDetails(res.data));
        console.log(res.data);
        if (!res.data.isAdmin) {
          window.location.href = "/";
        }
      })
      .catch((e) => {
        window.location.href = "/";
      });
  }, []);
  return <AdminApp />;
}

export default AdminDash;
