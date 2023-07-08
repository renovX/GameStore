import React, { useState, useEffect, useContext } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import axios from 'axios'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CommentCard from "./CommentCard";
import ChatRoom from "./Chat";
import { LoginContext } from "../../Context/LoginContext";
import io from 'socket.io-client'
import GameCard from "./GameCard";
import { IconButton, Grid, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import './Friend.css'
import { Container, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import Cookies from "js-cookie";
//const socket = io.connect('http://localhost:4000'); //
export default function UserProfile() {
    const { profileData, setProfile } = React.useContext(LoginContext);
    const { username } = useParams()
    const navigate = useNavigate()
    const [libraryGames, setLGames] = useState([])
    const [isFriend, setFriend] = useState(false)
    const [recentComments, setComments] = useState([])
    const [open, setOpen] = useState(false)
    const loginStatus = profileData.loggedIn
    const room = 'r1'
    const addNewFriend = async () => {
        const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/profile/add-friend/${username}`
        try {
            const token = Cookies.get('token')
            const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
            console.log(resp)
            const flist = new Set(profileData.friendList)
            flist.add(username)
            profileData.friendList = Array(flist)
            setProfile(profileData)
            setFriend(true)
        }
        catch (e) {
            console.log(e)
        }
    }
    const handleChat = () => {
        setOpen(true)
        //join room
        /*if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }*/
    }
    const handleClose = () => {
        /*const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });*/
        setOpen(false);
    };
    useEffect(() => {
        async function fetchUserData() {
            console.log(profileData.friendList)
            const x = profileData.friendList.find(f => f === username)
            console.log('x=' + x)
            if (x) setFriend(true)
            else setFriend(false)
            try {
                const res = await axios.get(`http://localhost:8000/profile/get-user/${username}`)
                setLGames(res.data.libraryGames)
                const games = res.data.libraryGames
                //finding comments;
                let comments = []

                await games.forEach(async (game) => {
                    let commentData = (await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/comment/get-comments/${game.id}`)).data
                    console.log(commentData)
                    if (commentData) {

                        commentData.forEach(comment => {
                            if (comment.uname === username) {
                                recentComments.push(comment)
                                setComments(recentComments)
                            }

                        })
                    }
                })
                setComments(comments)
            }
            catch (e) {
                navigate('*')
            }

        }
        fetchUserData()
        console.log('h' + recentComments[0])
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
                    <div><span className='ac-text'  > {username}</span><br />
                        {loginStatus ?
                            <>
                                <IconButton sx={{ marginLeft: 0 }}>
                                    <ChatBubbleOutlineIcon onClick={handleChat} />
                                </IconButton>  {isFriend ? <PeopleAltIcon /> : <IconButton onClick={addNewFriend} sx={{ marginLeft: 0 }}>
                                    <GroupAddIcon />
                                </IconButton>}<span className="online">Last Online</span>
                            </> :
                            <></>}
                    </div>
                </Box>
                <Box className='recent-comments' >
                    {recentComments.map((c, index) => {
                        const gameimg = libraryGames[index] ? libraryGames[index].img : ''
                        return (
                            <Box width={"20%"} height={'50%'} key={index}>
                                <CommentCard comm_data={c.data} rate={c.rate} gameImg={gameimg} />
                            </Box>)
                    })}
                </Box>
                <div className="account-name box2"><Box className='acbx'>

                </Box>

                    <Box className='acbx'>
                        <h3 className="games-head">Games</h3><br />
                        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                            {libraryGames.map((game, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <GameCard gameImg={game.img} hours={game.hours} id={game.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </Container>
        </div>
    )
}