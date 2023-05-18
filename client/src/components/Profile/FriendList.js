import { Box, List, ListItem, Divider, Avatar, ListItemText, ListItemAvatar, IconButton } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import React from "react";
export default function FriendList({ profileData }) {
    const flist = profileData.friendList;
    return (
        <List className="friend-list">
            {flist ? flist.map(uname => (
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <PersonRemoveIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonPinIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={uname}

                    />
                </ListItem>
            )) : <></>}
        </List>
    )

}