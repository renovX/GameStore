import React from "react"
import './Friend.css'
import { Box } from "@mui/material"
export default function ChatRoom({ username }) {
    return (
        <Box className='chat-box'>
            <div className="user-msg"><span>Hi</span></div>
            <div className="friend-msg"><span>Hi</span></div>
            <div className="user-msg"><span>Hows Everything</span></div>
            <div className="friend-msg"><span>good</span></div>
            <div className="user-msg"><span>Cupidatat reprehenderit deserunt est exercitation aliqua dolore non duis exercitation laboris duis. Sunt ex quis proident ut cupidatat laborum consequat dolor eiusmod ut enim. </span></div>

        </Box>
    )
}