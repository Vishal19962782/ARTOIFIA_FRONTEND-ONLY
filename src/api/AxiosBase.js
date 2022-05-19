import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:9000',
    headers: localStorage.getItem("token")?  {accesstoken: "bearer " + JSON.stringify(JSON.parse(localStorage.getItem("token")).token)}: null
})