import axios from 'axios';
export default axios.create({
    baseURL: '/',
    headers: localStorage.getItem("token")?  {accesstoken: "bearer " + JSON.stringify(JSON.parse(localStorage.getItem("token")).token)}: null
})