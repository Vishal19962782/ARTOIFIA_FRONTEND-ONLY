import { Modal, Paper } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import AxiosBase from '../api/AxiosBase'
import Post from './PostComponent/Post'

function PostModal({open,id}) {
    const [item,setItem]=useState({})
    useEffect(()=>{
        AxiosBase.get("/api/posts/getPostById"+id).then((res)=>{
            setItem(res.data)
        })
    })
  return (
    <Modal
    open={open}
    >
       <Paper>
           <Post post={item}/>
       </Paper>
    </Modal>
  )
}

export default PostModal