import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../api/AxiosBase";
export const fetchAsyncPosts = createAsyncThunk(
  "posts/fetchAsyncPosts",
  async () => {
    const response = await Axios.get("/api/user");
    return response.data;
  }
);
export const pushAsyncPosts = createAsyncThunk(
  "posts/pushAsyncPosts",
  (newPost) => {
    Axios.post("/api/user", newPost).then((res, rej) => {
      return res.data;
    });
  }
);

const initialState = {
  posts: [],
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    pushPosts: (state, { payload }) => {
      state.posts.push(payload.payload);
    },
  },
  extraReducers: {
    [fetchAsyncPosts.fulfilled]: (state, { payload }) => {
      return { ...state, posts: payload };
    },
    [pushAsyncPosts.fulfilled]: (state, { payload }) => {
      console.log("pushAsyncPosts.fulfilled" + JSON.stringify(payload));
      return { ...state, posts: state.posts.push(payload) };
    },
  },
});
export const getAllPosts = (state) => state.posts.posts;
export const { addPosts, pushPosts } = postSlice.actions;
export default postSlice.reducer;
