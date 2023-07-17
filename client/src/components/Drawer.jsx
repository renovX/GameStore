import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  List,
  ListItem,
  Collapse,
  Drawer,
  Button,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Icon,

}
  from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LogoutIcon from "@mui/icons-material/Logout";
import LogintIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie";
import { DrawerContext } from "../Context/DrawerContext";
import { LoginContext } from "../Context/LoginContext";
const iconArray = [
  <ManageAccountsIcon />,
  <Diversity1Icon />,
  <SportsEsportsIcon />,
  <ShoppingCartIcon />,
  <SettingsIcon />,
  <LogoutIcon />,
];

export default function TemporaryDrawer() {
  const { drawer, setDrawer } = React.useContext(DrawerContext);
  const { profileData, setProfile } = React.useContext(LoginContext);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [flist, setFL] = React.useState(false)
  const [loginState, setLogin] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: !state[anchor] });
  };
  const handleLogin = () => {
    setState({ ...state, [anchor]: false });
    setProfile({});
    navigate("/auth/signin");
  };
  const handleLogout = async () => {
    setDrawer(false);
    setState({ ...state, [anchor]: false });
    const url = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/logout`;
    Cookies.remove("token");
    await axios.post(url, { cart: profileData.cart, email: profileData.email });
    //console.log(profileData.cart[0]);
    setProfile({ islogged: false })
    navigate("/");

  };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        mt: "24%",
      }}
      role="presentation"
      /*onClick={toggleDrawer(anchor, true)}*/
      onKeyDown={toggleDrawer(anchor)}
    >
      {drawer ? (
        <List>
          {[
            { text: "Account", nav: "/profile/account" },
            { text: "Friends", nav: "" },
            { text: "Library", nav: "/profile/library" },
            { text: "Cart", nav: "/profile/cart/k" },
            { text: "Setting", nav: "/profile/account" },
          ].map(({ text, nav }, index) => {
            if (text == 'Friends')
              return (<>
                <ListItemButton onClick={() => { setFL(!flist) }}>
                  <ListItemIcon>
                    <Diversity1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItemButton>
                <Collapse in={flist} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {profileData.friendList ? profileData.friendList.map(uname => (
                      <Tooltip title="Add" placement="left" arrow>
                        <ListItem sx={{ pl: 4, backgroundColor: 'rgb(54, 55, 56)' }}>
                          <IconButton onClick={() => {
                            setState({ ...state, [anchor]: !state[anchor] });
                            navigate(`profiles/${uname}`)
                          }}>
                            <AccountCircleIcon />
                          </IconButton>
                          <ListItemText primary={uname} sx={{ color: 'white' }} />
                          <IconButton>
                            <ChatBubbleOutlineOutlinedIcon />
                          </IconButton>
                        </ListItem></Tooltip>)) : <></>}
                  </List>
                </Collapse>
              </>
              )
            else
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setState({ ...state, [anchor]: false });
                      navigate(nav);
                      toggleDrawer(anchor);
                    }}
                  >
                    <ListItemIcon>{iconArray[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
          })}
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogin}
            >
              <ListItemIcon>
                <LogintIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setState({ ...state, [anchor]: false });
                navigate("/auth/register");
              }}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <Button
        sx={{ color: "white", p: 0, textTransform: "none", fontSize: '1.3em' }}
        onClick={toggleDrawer(anchor)}
      >
        Profile
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#444444"
          }
        }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
