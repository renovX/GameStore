import React, { useState, useEffect } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from 'axios'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ImgMediaCard from "./ImgCard";
import ChatRoom from "./Chat";
import io from 'socket.io-client'
import GameCard from "./GameCard";
import { IconButton, Grid, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import './Friend.css'
import { Container, Box, Typography } from "@mui/material";
const socket = io.connect('http://localhost:4000'); //
export default function UserProfile({ username }) {
    const [libraryGames, setLGames] = useState([])
    const [recentComments, setComments] = useState([])
    const [open, setOpen] = useState(false)
    const room = 'r1'
    const handleChat = () => {
        setOpen(true)
        //join room
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
    }
    const handleClose = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });
        setOpen(false);
    };
    useEffect(() => {
        async function fetchUserData() {
            const res = await axios.get(`http://localhost:8000/profile/${username}`)
            setLGames(res.data.libraryGames)
            const games = res.data.libraryGames
            //finding comments;

        }
    }, [])
    return (
        <div><Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>

            <DialogContent >
                <ChatRoom />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

            </DialogActions>
        </Dialog>
            <Container className="main-box">

                <Box className='account-name' >
                    <img src="https://i.stack.imgur.com/YQu5k.png"></img>
                    <div><span className='ac-text'  > the_real_g</span><br />
                        <IconButton sx={{ marginLeft: 0 }}>
                            <ChatBubbleOutlineIcon onClick={handleChat} />
                        </IconButton><IconButton sx={{ marginLeft: 0 }}>
                            <GroupAddIcon />
                        </IconButton><span className="online">Last Online</span>
                    </div>
                </Box>
                <Box className='recent-comments' >
                    {[0, 0, 0, 0].map(el => (<Box width={"20%"} height={'50%'}><ImgMediaCard /></Box>))}
                </Box>
                <div className="account-name box2"><Box className='acbx'>

                </Box>

                    <Box className='acbx'>
                        <h3 className="games-head">Games</h3><br />
                        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                            {Array.from(Array(1)).map((_, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <GameCard />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </Container>
        </div>
    )
}