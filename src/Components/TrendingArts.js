import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IconButton, ImageListItemBar, Typography } from "@mui/material";
import AxiosBase from "../api/AxiosBase";
import { useEffect } from "react";

export default function MasonryImageList() {
  const [images, setImages] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    AxiosBase.get("/api/trending").then((res) => {
      setImages(res.data);
    });
  },[]);
  const handleClick=(id)=>{
    
    return <Typography variant="h1">Hello</Typography>
  //  <PostModal open={true} id={id}/>
  }
  return (
    <Box
      sx={{
        width: 360,
        height: 400,
        overflowY: "scroll",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <ImageList
        // sx={{ backgroundColor: "#f5f5f5" }}
        variant="masonry"
        cols={2}
        gap={4}
      >
        {images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item._id}
              loading="lazy"
              onClick={()=>handleClick(item._id)}
            />
            <ImageListItemBar
              title={item?.name}
              subtitle={item._postOwner}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                ></IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

